import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { policyHook } from './content'

const runHook = (payload: unknown) =>
  spawnSync('bash', ['-c', policyHook], {
    encoding: 'utf8',
    input: JSON.stringify(payload),
  })

describe('preToolUse policy hook example', () => {
  it('denies repository creation through gh', () => {
    const result = runHook({
      toolName: 'bash',
      toolArgs: JSON.stringify({ command: 'gh repo create personal/demo --public' }),
    })

    expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toMatchObject({
      permissionDecision: 'deny',
    })
  })

  it('denies public visibility changes', () => {
    const result = runHook({
      toolName: 'bash',
      toolArgs: {
        command: 'gh api repos/acme/demo -X PATCH -f visibility=public',
      },
    })

    expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toMatchObject({
      permissionDecision: 'deny',
    })
  })

  it('allows unrelated commands to continue through the normal permission flow', () => {
    const result = runHook({
      toolName: 'bash',
      toolArgs: JSON.stringify({ command: 'bun test' }),
    })

    expect(result.status).toBe(0)
    expect(JSON.parse(result.stdout)).toEqual({})
  })

  it('fails closed on malformed input instead of returning an allow decision', () => {
    const result = spawnSync('bash', ['-c', policyHook], {
      encoding: 'utf8',
      input: '{not-json',
    })

    expect(result.status).not.toBe(0)
  })
})
