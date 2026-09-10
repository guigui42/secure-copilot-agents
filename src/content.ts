export type Audience = 'both' | 'admin' | 'developer'
export type Surface = 'all' | 'cli' | 'app' | 'vscode' | 'cloud'
export type Strength =
  | 'hard-boundary'
  | 'approval-gate'
  | 'conditional'
  | 'guidance'
  | 'detective'

export type LayerId =
  | 'scope'
  | 'context'
  | 'identity'
  | 'permission'
  | 'isolation'
  | 'tool-policy'
  | 'repository'
  | 'observability'

export interface Source {
  id: string
  title: string
  url: string
  category: 'GitHub Docs' | 'GitHub Changelog' | 'Well-Architected' | 'CLI manual'
}

export interface CodeExample {
  title: string
  language: 'json' | 'bash' | 'yaml'
  code: string
  note?: string
}

export interface ActionItem {
  text: string
  sourceId?: string
}

export interface Module {
  id: string
  step: number
  title: string
  summary: string
  risk: string
  surfaces: Exclude<Surface, 'all'>[]
  strengths: Strength[]
  adminActions: ActionItem[]
  developerActions: ActionItem[]
  validation: string[]
  limitations: string[]
  sourceIds: string[]
  examples?: CodeExample[]
}

export interface SecurityLayer {
  id: LayerId
  label: string
  shortLabel: string
  description: string
  surfaces: Exclude<Surface, 'all'>[]
}

export interface RiskScenario {
  id: string
  label: string
  description: string
  primary: LayerId[]
  supporting: LayerId[]
  gaps: Partial<Record<Exclude<Surface, 'all'>, LayerId[]>>
}

export const verifiedDate = '2026-09-10'

export const surfaceLabels: Record<Surface, string> = {
  all: 'All surfaces',
  cli: 'Copilot CLI',
  app: 'Copilot app',
  vscode: 'VS Code Agent Host',
  cloud: 'Cloud agent',
}

export const strengthLabels: Record<Strength, string> = {
  'hard-boundary': 'Hard boundary',
  'approval-gate': 'Approval gate',
  conditional: 'Conditional enforcement',
  guidance: 'Behavioral guidance',
  detective: 'Detective control',
}

export const sources: Source[] = [
  {
    id: 'managed-settings',
    title: 'Enterprise managed settings',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/enterprise-administrators/enterprise-managed-settings',
    category: 'GitHub Docs',
  },
  {
    id: 'configure-managed',
    title: 'Configuring enterprise-managed settings',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/configure-enterprise-managed-settings',
    category: 'GitHub Docs',
  },
  {
    id: 'managed-permissions-ga',
    title: 'Enterprise managed permissions for Copilot agent operations',
    url: 'https://github.blog/changelog/2026-09-09-enterprise-managed-permissions-for-github-copilot-agent-operations/',
    category: 'GitHub Changelog',
  },
  {
    id: 'sandbox-concepts',
    title: 'About cloud and local sandboxes for GitHub Copilot',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/about-cloud-and-local-sandboxes',
    category: 'GitHub Docs',
  },
  {
    id: 'content-exclusion',
    title: 'Content exclusion for GitHub Copilot',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/context/content-exclusion',
    category: 'GitHub Docs',
  },
  {
    id: 'sandbox-config',
    title: 'Configuring local sandbox settings',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings',
    category: 'GitHub Docs',
  },
  {
    id: 'hooks',
    title: 'GitHub Copilot hooks reference',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/hooks-reference',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-guardrails',
    title: 'Building guardrails for GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/cloud-agent/build-guardrails',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-risks',
    title: 'Risks and mitigations for GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/cloud-agent/risks-and-mitigations',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-resources',
    title: 'Giving Copilot cloud agent access to organization resources',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/tutorials/cloud-agent/give-access-to-resources',
    category: 'GitHub Docs',
  },
  {
    id: 'cloud-firewall',
    title: 'Customizing the firewall for GitHub Copilot cloud agent',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall',
    category: 'GitHub Docs',
  },
  {
    id: 'programmatic-access',
    title: 'About programmatic access in your organization',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-programmatic-access-to-your-organization/about-programmatic-access-in-your-organization',
    category: 'GitHub Docs',
  },
  {
    id: 'app-auth',
    title: 'About authentication with a GitHub App',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app',
    category: 'GitHub Docs',
  },
  {
    id: 'pat-policy',
    title: 'Setting a personal access token policy for your organization',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-programmatic-access-to-your-organization/setting-a-personal-access-token-policy-for-your-organization',
    category: 'GitHub Docs',
  },
  {
    id: 'monitoring',
    title: 'Monitoring agentic activity in your enterprise',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity',
    category: 'GitHub Docs',
  },
  {
    id: 'agent-audit',
    title: 'Audit log events for agents',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/reference/enterprise-administrators/agentic-audit-log-events',
    category: 'GitHub Docs',
  },
  {
    id: 'otel',
    title: 'OpenTelemetry for agent monitoring',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/enterprise/opentelemetry',
    category: 'GitHub Docs',
  },
  {
    id: 'governing-agents',
    title: 'Governing agents in GitHub Enterprise',
    url: 'https://learn.github.com/well-architected/governance/recommendations/governing-agents',
    category: 'Well-Architected',
  },
  {
    id: 'gh-env',
    title: 'GitHub CLI environment variables',
    url: 'https://cli.github.com/manual/gh_help_environment',
    category: 'CLI manual',
  },
  {
    id: 'repo-custom-properties',
    title: 'Managing custom properties for repositories',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization',
    category: 'GitHub Docs',
  },
  {
    id: 'gh-auth-status',
    title: 'Checking GitHub CLI authentication status',
    url: 'https://cli.github.com/manual/gh_auth_status',
    category: 'CLI manual',
  },
  {
    id: 'mcp-allowlist',
    title: 'Configuring an enterprise MCP server allowlist',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist',
    category: 'GitHub Docs',
  },
  {
    id: 'mcp-cli',
    title: 'Adding MCP servers for GitHub Copilot CLI',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers',
    category: 'GitHub Docs',
  },
  {
    id: 'code-owners',
    title: 'About code owners',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners',
    category: 'GitHub Docs',
  },
  {
    id: 'review-pr-changes',
    title: 'Reviewing proposed changes in a pull request',
    url: 'https://docs.github.com/en/enterprise-cloud@latest/pull-requests/how-tos/review-pull-requests/reviewing-proposed-changes-in-a-pull-request',
    category: 'GitHub Docs',
  },
]

export const securityLayers: SecurityLayer[] = [
  {
    id: 'scope',
    label: 'Deployment scope',
    shortLabel: 'Scope',
    description: 'Limit agent use to approved users, organizations, and repositories.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
  },
  {
    id: 'identity',
    label: 'Dedicated identity',
    shortLabel: 'Identity',
    description: 'Use short-lived credentials with only the required repositories and permissions.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
  },
  {
    id: 'context',
    label: 'Context boundary',
    shortLabel: 'Context',
    description: 'Exclude sensitive files and treat external context as untrusted input.',
    surfaces: ['cli', 'app', 'vscode'],
  },
  {
    id: 'permission',
    label: 'Managed permission',
    shortLabel: 'Permission',
    description: 'Centrally deny, ask, or allow agent operations on supported clients.',
    surfaces: ['cli', 'app', 'vscode'],
  },
  {
    id: 'isolation',
    label: 'Execution isolation',
    shortLabel: 'Isolation',
    description: 'Restrict filesystem, network, credentials, and runtime persistence.',
    surfaces: ['cli', 'app', 'cloud'],
  },
  {
    id: 'tool-policy',
    label: 'Tool policy',
    shortLabel: 'Tools',
    description: 'Constrain MCP, plugins, hooks, and privileged tool payloads.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
  },
  {
    id: 'repository',
    label: 'Repository gate',
    shortLabel: 'Repository',
    description: 'Require review, rulesets, validation, and protected configuration.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
  },
  {
    id: 'observability',
    label: 'Audit and response',
    shortLabel: 'Observe',
    description: 'Correlate sessions, policy changes, tool use, and repository activity.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
  },
]

export const riskScenarios: RiskScenario[] = [
  {
    id: 'personal-repository',
    label: 'Wrong repository',
    description:
      'The agent attempts to create or modify a repository outside the approved enterprise scope.',
    primary: ['identity', 'scope', 'repository'],
    supporting: ['permission', 'tool-policy', 'observability'],
    gaps: {
      cloud: ['permission'],
    },
  },
  {
    id: 'credential-theft',
    label: 'Credential exposure',
    description:
      'A tool or generated command tries to read the developer keychain, SSH keys, gh profile, or registry tokens.',
    primary: ['identity', 'isolation'],
    supporting: ['permission', 'tool-policy', 'observability'],
    gaps: {
      vscode: ['isolation'],
    },
  },
  {
    id: 'untrusted-mcp',
    label: 'Untrusted MCP',
    description:
      'A repository or user configuration introduces an unreviewed MCP server with broad tools or data access.',
    primary: ['tool-policy', 'repository'],
    supporting: ['scope', 'identity', 'observability'],
    gaps: {
      cloud: ['permission'],
    },
  },
  {
    id: 'network-exfiltration',
    label: 'Data exfiltration',
    description:
      'A command attempts to send source code, prompts, or secrets to an unapproved network destination.',
    primary: ['isolation', 'identity'],
    supporting: ['permission', 'tool-policy', 'observability'],
    gaps: {
      cloud: ['tool-policy'],
      vscode: ['isolation'],
    },
  },
  {
    id: 'workflow-escalation',
    label: 'Privileged workflow',
    description:
      'Agent-authored workflow changes could run with secrets or broader permissions before human review.',
    primary: ['repository', 'scope'],
    supporting: ['tool-policy', 'observability'],
    gaps: {},
  },
  {
    id: 'prompt-injection',
    label: 'Untrusted instructions',
    description:
      'An issue, pull request comment, MCP response, or fetched page contains instructions designed to redirect the agent or expose data.',
    primary: ['scope', 'tool-policy', 'repository'],
    supporting: ['context', 'identity', 'isolation', 'observability'],
    gaps: {
      vscode: ['context'],
    },
  },
]

export const managedSettings = String.raw`{
  "permissions": {
    "disableBypassPermissionsMode": "disable",
    "deny": [
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.config/gh/**)",
      "Edit(//etc/**)",
      "Shell(gh repo create *)"
    ],
    "ask": [
      "Shell(git push *)",
      "Shell(gh api *)",
      "Domain(api.github.com)"
    ],
    "allow": [
      "Read(/src/**)",
      "Edit(/src/**)",
      "Shell(bun test *)",
      "Shell(bun run build *)"
    ]
  },
  "allowedMcpServers": [
    {
      "serverUrl": "https://mcp.approved.example/*"
    }
  ],
  "deniedMcpServers": [
    {
      "serverCommand": ["npx", "-y", "unreviewed-mcp-server"]
    }
  ],
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowBypass": false,
    "addCurrentWorkingDirectory": false,
    "sandboxMcpServers": true,
    "sandboxLspServers": true,
    "gitAuth": false,
    "ghAuth": false,
    "allowDevToolAccess": false,
    "userPolicy": {
      "filesystem": {
        "readwritePaths": [
          "/absolute/path/to/approved/workspace"
        ],
        "readonlyPaths": [],
        "deniedPaths": [
          "/absolute/path/to/sensitive-data"
        ]
      },
      "network": {
        "allowOutbound": false,
        "allowLocalNetwork": false
      },
      "seatbelt": {
        "keychainAccess": false
      }
    }
  },
  "telemetry": {
    "enabled": true,
    "endpoint": "https://otel-collector.example",
    "protocol": "http/protobuf",
    "captureContent": false,
    "lockCaptureContent": true,
    "serviceName": "copilot"
  }
}`

export const isolatedCli = String.raw`#!/usr/bin/env bash
set -euo pipefail

export GH_CONFIG_DIR="$(mktemp -d)"
trap 'rm -rf "$GH_CONFIG_DIR"' EXIT

# Obtain this short-lived value from your approved token broker.
export GH_TOKEN="$COPILOT_GITHUB_APP_TOKEN"

# Avoid the developer's global Git configuration and SSH credentials.
export GIT_CONFIG_NOSYSTEM=1
export GIT_CONFIG_GLOBAL=/dev/null
unset GITHUB_TOKEN SSH_AUTH_SOCK

copilot --experimental --sandbox`

export const policyHookConfig = String.raw`{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "/usr/local/libexec/copilot-policy/pre-tool-use.sh",
        "powershell": "C:\\Program Files\\GitHub Copilot\\Policy\\pre-tool-use.ps1",
        "timeoutSec": 5
      }
    ]
  }
}`

export const policyHook = String.raw`#!/usr/bin/env bash
set -euo pipefail

payload="$(cat)"
tool_name="$(jq -r '.toolName // ""' <<<"$payload")"
command="$(jq -r '
  if (.toolArgs | type) == "string" then
    ((.toolArgs | fromjson?) // {} | .command // "")
  else
    (.toolArgs.command // "")
  end
' <<<"$payload")"

deny() {
  jq -n --arg reason "$1" '{
    permissionDecision: "deny",
    permissionDecisionReason: $reason
  }'
  exit 0
}

if [[ "$tool_name" =~ ^(bash|powershell)$ ]]; then
  if [[ "$command" =~ (^|[[:space:]\;\&\|])gh[[:space:]]+repo[[:space:]]+create([[:space:]]|$) ]]; then
    deny "Repository creation is blocked by enterprise policy."
  fi

  if [[ "$command" =~ visibility[=\ \"\']*public ]]; then
    deny "Public visibility changes are blocked by enterprise policy."
  fi
fi

printf '{}\n'`

export const cloudChecklist = String.raw`name: Copilot setup steps

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  copilot-setup-steps:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false
      - name: Install locked dependencies
        run: bun install --frozen-lockfile`

export const modules: Module[] = [
  {
    id: 'scope',
    step: 1,
    title: 'Scope the deployment',
    summary: 'Decide where agents can run before deciding what they can do.',
    risk:
      'A broad rollout makes every repository, user, and integration part of the initial blast radius.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
    strengths: ['hard-boundary', 'guidance'],
    adminActions: [
      {
        text: 'Enable agentic features only for approved organizations, repositories, and pilot groups.',
        sourceId: 'governing-agents',
      },
      {
        text: 'Classify repositories by sensitivity and use custom properties to target policies and rulesets.',
        sourceId: 'repo-custom-properties',
      },
      {
        text: 'Keep personal repositories and ungoverned organizations outside the enterprise agent scope.',
      },
    ],
    developerActions: [
      {
        text: 'Run agents from the intended repository root and confirm the selected account and billing entity.',
        sourceId: 'gh-auth-status',
      },
      {
        text: 'Use disposable repositories for new agents, MCP servers, hooks, and automation experiments.',
      },
    ],
    validation: [
      'Confirm an unapproved repository cannot start the cloud agent.',
      'Confirm pilot users can identify which policy source governs their client.',
    ],
    limitations: [
      'Scope policy does not reduce the permissions of credentials already exposed to a local process.',
    ],
    sourceIds: [
      'cloud-guardrails',
      'governing-agents',
      'repo-custom-properties',
      'gh-auth-status',
    ],
  },
  {
    id: 'context',
    step: 2,
    title: 'Protect sensitive context',
    summary: 'Reduce what Copilot can use as context and treat external content as untrusted data.',
    risk:
      'Sensitive files can enter prompts or responses, while malicious issues, pull request text, MCP output, and web content can try to redirect an agent.',
    surfaces: ['cli', 'app', 'vscode'],
    strengths: ['conditional', 'guidance'],
    adminActions: [
      {
        text: 'Configure content exclusions for files and paths that should not be available to Copilot.',
        sourceId: 'content-exclusion',
      },
      {
        text: 'Review exclusion changes centrally and include sensitive generated files, private configuration, and restricted source paths.',
        sourceId: 'content-exclusion',
      },
      {
        text: 'Treat issue text, pull request comments, MCP responses, and fetched web content as untrusted input rather than policy.',
        sourceId: 'cloud-risks',
      },
    ],
    developerActions: [
      {
        text: 'Do not paste excluded content into prompts or expose it through an approved tool.',
        sourceId: 'content-exclusion',
      },
      {
        text: 'Verify externally supplied instructions against the original task, repository policy, and requested scope before acting.',
        sourceId: 'cloud-risks',
      },
      {
        text: 'Stop and request review when external content asks for credentials, broader access, disabled checks, or unrelated changes.',
        sourceId: 'cloud-risks',
      },
    ],
    validation: [
      'Confirm excluded files do not inform Copilot app or Copilot CLI responses.',
      'Confirm affected files are excluded from Copilot code review where supported.',
      'Test IDE agent workflows separately because exclusions do not currently apply in Edit and Agent modes.',
    ],
    limitations: [
      'Content exclusion is not supported in Edit and Agent modes of Copilot Chat in VS Code and other editors.',
      'IDEs can still provide indirect semantic information such as type data, hover definitions, and build configuration.',
      'Exclusions do not apply to symbolic links or repositories on remote filesystems.',
      'Content exclusion reduces context exposure. It does not neutralize prompt injection or replace scoped tools and credentials.',
    ],
    sourceIds: ['content-exclusion', 'cloud-risks'],
  },
  {
    id: 'identity',
    step: 3,
    title: 'Use a dedicated identity',
    summary: 'Make the credential match the exact repositories and operations the agent needs.',
    risk:
      'A developer credential can let an agent act across personal repositories, unrelated organizations, packages, or infrastructure.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
    strengths: ['hard-boundary'],
    adminActions: [
      {
        text: 'Prefer GitHub App installation tokens for repeated access and install the App only on selected repositories.',
        sourceId: 'app-auth',
      },
      {
        text: 'If an App is impractical, require approval for fine-grained PATs and restrict classic PAT access.',
        sourceId: 'pat-policy',
      },
      {
        text: 'Mint short-lived credentials through a controlled launcher or token broker. Never expose the App private key.',
        sourceId: 'app-auth',
      },
    ],
    developerActions: [
      {
        text: 'Use a separate GH_CONFIG_DIR and avoid the normal gh profile, SSH agent, keychain, and package credentials.',
        sourceId: 'gh-env',
      },
      {
        text: 'Verify the active token and repository owner before allowing write operations.',
        sourceId: 'gh-auth-status',
      },
    ],
    validation: [
      'Run gh auth status and confirm the dedicated GH_TOKEN is the active credential for the target host.',
      'Confirm the sandbox cannot reach the OS keychain or the developer credential helper.',
      'Confirm the token cannot access an unselected repository or create a personal repository.',
      'Revoke the installation or token and confirm access stops immediately or at token expiry.',
    ],
    limitations: [
      'A token is still usable by any process that can read it. Combine token scope with runtime isolation.',
      'GH_CONFIG_DIR isolates configuration files, not the operating-system keychain by itself.',
      'Fine-grained PATs remain tied to a person and have feature limitations compared with GitHub Apps.',
    ],
    sourceIds: [
      'programmatic-access',
      'app-auth',
      'pat-policy',
      'gh-env',
      'gh-auth-status',
    ],
    examples: [
      {
        title: 'Launch Copilot CLI with isolated GitHub state',
        language: 'bash',
        code: isolatedCli,
        note:
          'GH_TOKEN takes precedence over stored gh credentials. GH_CONFIG_DIR does not isolate the OS keychain, so the sandbox must also block keychain and credential-helper access.',
      },
    ],
  },
  {
    id: 'permissions',
    step: 4,
    title: 'Set enterprise permissions',
    summary: 'Use centrally managed deny, ask, and allow rules on supported clients.',
    risk:
      'Local auto-approval, saved approvals, or allow-all modes can turn an interactive agent into an unrestricted process.',
    surfaces: ['cli', 'app', 'vscode'],
    strengths: ['hard-boundary', 'approval-gate'],
    adminActions: [
      {
        text: 'Use deny for operations that must never run, ask for high-risk writes, and allow only repeatable low-risk work.',
        sourceId: 'configure-managed',
      },
      {
        text: 'Set disableBypassPermissionsMode to disable so users cannot enable allow-all or YOLO modes.',
        sourceId: 'managed-settings',
      },
      {
        text: 'Use server-managed settings for review history and broad client coverage. Add device policy for controls that must survive account switching or a server outage.',
        sourceId: 'configure-managed',
      },
    ],
    developerActions: [
      {
        text: 'Treat each managed ask prompt as a new decision. Check the full command, path, and destination.',
        sourceId: 'managed-settings',
      },
      {
        text: 'Report blocked legitimate workflows instead of weakening local settings.',
      },
    ],
    validation: [
      'Confirm a deny rule blocks the operation even when another source allows it.',
      'Confirm managed ask prompts again on the next matching operation.',
      'Confirm unmatched supported operations require approval when managed rules are present.',
    ],
    limitations: [
      'Domain rules understand origins, not repository ownership or business intent.',
      'Granular permission rules do not apply to Copilot cloud agent in the same way as Agent Host clients.',
    ],
    sourceIds: ['managed-settings', 'configure-managed', 'managed-permissions-ga'],
    examples: [
      {
        title: 'High-assurance managed settings baseline',
        language: 'json',
        code: managedSettings,
        note:
          'Replace absolute paths and approved endpoints. Sandbox keys currently apply to Copilot CLI and include preview or experimental behavior.',
      },
    ],
  },
  {
    id: 'sandbox',
    step: 5,
    title: 'Sandbox execution',
    summary: 'Reduce what generated commands can read, change, and reach.',
    risk:
      'Without isolation, shell commands inherit the developer account, filesystem, network, keychain, and toolchain credentials.',
    surfaces: ['cli', 'app', 'cloud'],
    strengths: ['hard-boundary', 'conditional'],
    adminActions: [
      {
        text: 'For Copilot CLI, require sandboxing, fail if it is unavailable, disable bypass, and sandbox local MCP and LSP servers.',
        sourceId: 'sandbox-config',
      },
      {
        text: 'Disable inherited Git and gh authentication unless the controlled workflow explicitly needs it.',
        sourceId: 'sandbox-config',
      },
      {
        text: 'For cloud agent, use GitHub-hosted runners or ephemeral self-hosted runners with external log retention.',
        sourceId: 'cloud-risks',
      },
    ],
    developerActions: [
      {
        text: 'Grant only the workspace paths and domains needed for the task.',
        sourceId: 'sandbox-config',
      },
      {
        text: 'Keep keychain, SSH, cloud CLI, registry, and shared dev-tool access disabled by default.',
        sourceId: 'sandbox-config',
      },
    ],
    validation: [
      'Attempt to read a denied path and connect to a denied domain.',
      'Stop or break the sandbox backend and confirm failIfUnavailable blocks execution.',
      'Confirm each cloud-agent job starts without state from a prior job.',
    ],
    limitations: [
      'Local sandboxing is preview or experimental and uses OS-level containment, not a separate VM.',
      'Windows local sandboxing currently requires a Windows Insiders build.',
      'A proxy is not always a complete egress boundary because some applications can ignore it.',
    ],
    sourceIds: ['sandbox-concepts', 'sandbox-config', 'managed-settings'],
  },
  {
    id: 'tools',
    step: 6,
    title: 'Govern MCP, plugins, and hooks',
    summary: 'Review every extension point that can add tools, data, or executable code.',
    risk:
      'An unreviewed MCP server, plugin, hook, or setup script can bypass the intent of a safe agent profile.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
    strengths: ['hard-boundary', 'conditional', 'guidance'],
    adminActions: [
      {
        text: 'Allowlist remote MCP URLs or exact local server commands and block known-unapproved servers.',
        sourceId: 'mcp-allowlist',
      },
      {
        text: 'Restrict plugin marketplaces and protect enterprise custom agents and plugin sources.',
        sourceId: 'governing-agents',
      },
      {
        text: 'Install machine-wide policy hooks for Copilot CLI when tool payload checks add value.',
        sourceId: 'hooks',
      },
    ],
    developerActions: [
      {
        text: 'Request the smallest MCP tool set and keep write tools out until the read-only workflow is proven.',
        sourceId: 'mcp-cli',
      },
      {
        text: 'Pin package versions for local MCP servers and review their source, network behavior, and authentication.',
      },
    ],
    validation: [
      'Confirm an unlisted MCP server cannot start on each supported local client.',
      'Feed synthetic payloads into preToolUse hooks and verify allow and deny decisions.',
      'Test hook timeout behavior and confirm another hard control still protects the destination.',
    ],
    limitations: [
      'Built-in first-party Copilot MCP servers are exempt from managed MCP deny lists.',
      'Policy hooks are Copilot CLI only. Cloud agent uses repository hooks.',
      'Hook timeouts fail open, and hooks cannot inspect opaque network traffic inside arbitrary code.',
    ],
    sourceIds: [
      'managed-settings',
      'hooks',
      'cloud-resources',
      'governing-agents',
      'mcp-allowlist',
      'mcp-cli',
    ],
    examples: [
      {
        title: 'Machine-wide preToolUse hook configuration',
        language: 'json',
        code: policyHookConfig,
        note:
          'Place policy JSON under /etc/github-copilot/policy.d on macOS or Linux, or use the documented Windows policy locations.',
      },
      {
        title: 'Example POSIX policy hook',
        language: 'bash',
        code: policyHook,
        note:
          'This sample handles visible shell payloads only. Keep the timeout short and rely on scoped credentials for the real authorization boundary.',
      },
    ],
  },
  {
    id: 'cloud-agent',
    step: 7,
    title: 'Secure Copilot cloud agent',
    summary: 'Use the controls native to the ephemeral GitHub Actions execution path.',
    risk:
      'Cloud jobs can install dependencies, call MCP servers, use Agents secrets, and propose workflow changes at machine speed.',
    surfaces: ['cloud'],
    strengths: ['hard-boundary', 'approval-gate', 'conditional'],
    adminActions: [
      {
        text: 'Keep the cloud-agent firewall enabled and manage its allowlist at organization level.',
        sourceId: 'cloud-firewall',
      },
      {
        text: 'Keep workflow execution blocked until someone with write access approves the agent-authored branch.',
        sourceId: 'cloud-guardrails',
      },
      {
        text: 'Preserve the independent review protections that prevent Copilot and the requesting user from approving the resulting pull request.',
        sourceId: 'cloud-guardrails',
      },
      {
        text: 'Use Agents secrets only for values the agent must access and keep ordinary Actions secrets separate.',
        sourceId: 'cloud-resources',
      },
      {
        text: 'Choose GitHub-hosted runners or enforce ephemeral self-hosted runner lifecycle and network controls.',
        sourceId: 'cloud-risks',
      },
    ],
    developerActions: [
      {
        text: 'Keep copilot-setup-steps.yml deterministic, least-privilege, and locked to reviewed dependencies.',
        sourceId: 'cloud-guardrails',
      },
      {
        text: 'Treat issue text, pull request comments, MCP results, and fetched pages as untrusted input that can contain prompt injection.',
        sourceId: 'cloud-risks',
      },
      {
        text: 'Review changes to workflows, hooks, MCP configuration, instructions, and agent definitions before running privileged checks.',
        sourceId: 'cloud-guardrails',
      },
    ],
    validation: [
      'Confirm a user without write access cannot trigger the agent and their comments are not presented to it.',
      'Confirm a non-allowlisted Bash destination is blocked.',
      'Confirm MCP and setup-step traffic are tested separately because the firewall does not cover them.',
      'Confirm agent-authored workflows wait for human approval.',
      'Confirm Copilot cannot mark its pull request ready, approve it, or merge it, and the requesting user cannot approve it.',
    ],
    limitations: [
      'The cloud-agent firewall does not apply to MCP servers or environment setup steps.',
      'The setup workflow GITHUB_TOKEN policy is separate from the token used by the agent session.',
      'Prompt injection cannot be eliminated through instructions or content exclusions alone. Limit tools, credentials, destinations, and merge authority.',
    ],
    sourceIds: ['cloud-guardrails', 'cloud-risks', 'cloud-resources', 'cloud-firewall'],
    examples: [
      {
        title: 'Least-privilege setup workflow skeleton',
        language: 'yaml',
        code: cloudChecklist,
        note:
          'Protect this file with CODEOWNERS and rulesets. Pin actions to reviewed commit SHAs in production.',
      },
    ],
  },
  {
    id: 'merge-path',
    step: 8,
    title: 'Protect the merge path',
    summary: 'Apply the same review and security gates to agent-authored code.',
    risk:
      'Even a well-contained agent can produce insecure, incorrect, or policy-breaking changes.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
    strengths: ['hard-boundary', 'approval-gate', 'detective'],
    adminActions: [
      {
        text: 'Require independent pull request review, status checks, and code-owner approval for high-risk paths.',
        sourceId: 'code-owners',
      },
      {
        text: 'Protect instructions, agents, skills, MCP files, hooks, and setup workflows from unreviewed changes.',
        sourceId: 'code-owners',
      },
      {
        text: 'Require dependency review, code scanning, secret scanning, and applicable test workflows.',
      },
    ],
    developerActions: [
      {
        text: 'Review the diff, generated dependencies, commands run, and declared validation before approving.',
        sourceId: 'review-pr-changes',
      },
      {
        text: 'Do not treat Copilot code review as a replacement for an accountable human approver.',
      },
    ],
    validation: [
      'Open a test pull request that changes a protected agent configuration file and confirm code-owner review is required.',
      'Introduce a controlled vulnerable dependency and confirm required checks block the merge.',
    ],
    limitations: [
      'Instructions improve behavior but can be ignored or misinterpreted. Repository enforcement decides what can merge.',
    ],
    sourceIds: [
      'cloud-guardrails',
      'governing-agents',
      'code-owners',
      'review-pr-changes',
    ],
  },
  {
    id: 'monitor',
    step: 9,
    title: 'Monitor and improve',
    summary: 'Use audit evidence to tune controls and detect unexpected agent behavior.',
    risk:
      'Without correlated activity, teams cannot distinguish a failed prompt, a policy gap, a compromised credential, or a malicious configuration change.',
    surfaces: ['cli', 'app', 'vscode', 'cloud'],
    strengths: ['detective', 'guidance'],
    adminActions: [
      {
        text: 'Monitor agent audit events and correlate repository activity with agent_session_id.',
        sourceId: 'monitoring',
      },
      {
        text: 'Use OpenTelemetry on supported clients with content capture disabled unless approved.',
        sourceId: 'otel',
      },
      {
        text: 'Alert on policy changes, MCP changes, high-risk file edits, unusual session volume, and ruleset bypass.',
        sourceId: 'agent-audit',
      },
    ],
    developerActions: [
      {
        text: 'Review session evidence after changing instructions, MCP servers, plugins, hooks, or setup steps.',
        sourceId: 'monitoring',
      },
      {
        text: 'Report repeated approval prompts and false denials so policies can be narrowed without bypassing them.',
      },
    ],
    validation: [
      'Trigger a test session and trace its session, commit, and pull request events.',
      'Confirm telemetry excludes prompts, responses, code, and tool arguments by default.',
    ],
    limitations: [
      'Audit events do not provide a complete step-by-step transcript.',
      'Some streaming capabilities are preview-only or limited to specific enterprise deployment models.',
    ],
    sourceIds: ['monitoring', 'agent-audit', 'otel', 'governing-agents'],
  },
]

export const maturityChecks = [
  {
    id: 'scope',
    label: 'Agent access is limited to approved users and repositories.',
  },
  {
    id: 'context',
    label: 'Sensitive content is excluded, and untrusted external context is treated as data rather than policy.',
  },
  {
    id: 'identity',
    label: 'Agents use short-lived, dedicated credentials instead of developer credentials.',
  },
  {
    id: 'permissions',
    label: 'Managed deny, ask, and allow rules block bypass modes where supported.',
  },
  {
    id: 'sandbox',
    label: 'Execution is isolated with fail-closed behavior for required environments.',
  },
  {
    id: 'tools',
    label: 'MCP servers, plugins, hooks, and setup files are reviewed and protected.',
  },
  {
    id: 'review',
    label: 'Agent-authored changes pass independent review and required security checks.',
  },
  {
    id: 'audit',
    label: 'Agent sessions and policy changes are visible in audit and monitoring systems.',
  },
  {
    id: 'testing',
    label: 'Controls are tested against misuse scenarios after every material change.',
  },
]
