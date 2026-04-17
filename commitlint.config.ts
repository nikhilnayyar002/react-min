import type { UserConfig } from "@commitlint/types"; // [!code focus]

// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference/configuration.md#typescript-configuration
// https://github.com/conventional-changelog/commitlint/blob/master/docs/reference/prompt.md
const configuration: UserConfig = {
    extends: ['@commitlint/config-conventional'],
    prompt: {
        settings: {
            useExclamationMark: true
        },
        questions: {
            type: {
                description: "Select the type of change that you're committing:",
                enum: {
                    feat: {
                        description: 'A new feature',
                        title: 'Features',
                        emoji: '✨',
                    },
                    fix: {
                        description: 'A bug fix',
                        title: 'Bug Fixes',
                        emoji: '🐛',
                    },
                    docs: {
                        description: 'Documentation only changes',
                        title: 'Documentation',
                        emoji: '📚',
                    },
                    style: {
                        description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
                        title: 'Styles',
                        emoji: '💎',
                    },
                    refactor: {
                        description: 'A code change that neither fixes a bug nor adds a feature',
                        title: 'Code Refactoring',
                        emoji: '📦',
                    },
                    perf: {
                        description: 'A code change that improves performance',
                        title: 'Performance Improvements',
                        emoji: '🚀',
                    },
                    test: {
                        description: 'Adding missing tests or correcting existing tests',
                        title: 'Tests',
                        emoji: '🚨',
                    },
                    build: {
                        description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
                        title: 'Builds',
                        emoji: '🛠',
                    },
                    ci: {
                        description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
                        title: 'Continuous Integrations',
                        emoji: '⚙️',
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: 'Chores',
                        emoji: '♻️',
                    },
                    revert: {
                        description: 'Reverts a previous commit',
                        title: 'Reverts',
                        emoji: '🗑',
                    },
                },
            },
            scope: {
                description:
                    'nik What is the scope of this change (e.g. branch, component or file name)',
            },
            subject: {
                description: 'Write a short, imperative tense description of the change',
            },
            body: {
                description: 'Provide a longer description of the change',
            },
            isBreaking: {
                description: 'Are there any breaking changes?',
            },
            breaking: {
                description: 'Describe the breaking changes',
            },
            isIssueAffected: {
                description: 'Does this change affect any open issues?',
            },
            issuesBody: {
                description:
                    'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)',
            },
        },
    }
};

export default configuration;
