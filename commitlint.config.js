module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      skip: ':skip',
      max: 'upper %d chars',
      min: '%d chars at least',
      emptyWarning: 'can not be empty',
      upperLimitWarning: 'over limit',
      lowerLimitWarning: 'below limit',
    },
    questions: {
      type: {
        description: '选择您要提交的更改类型:',
        enum: {
          feat: {
            description: '一个新功能',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: '一个错误修复',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: '仅文档更改',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: '不影响代码含义的更改（空格、格式、缺少分号等）',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: '既不修复错误也不添加功能的代码更改',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: '提高性能的代码更改',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: '添加缺失的测试或纠正现有的测试',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              '影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              '对 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs）',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: '不修改 src 或测试文件的其他更改',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: '恢复之前的提交',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: '此更改的范围是什么(例如组件或文件名)',
      },
      subject: {
        description: '写一个简短的、命令式的变化描述',
      },
      body: {
        description: '提供更详细的更改说明',
      },
      isBreaking: {
        description: '是否有任何重大变化?',
      },
      breakingBody: {
        description: '重大变化提交需要一个主体。 请输入对提交本身的更长描述',
      },
      breaking: {
        description: '描述重大变化',
      },
      isIssueAffected: {
        description: '此更改是否会影响任何未解决的问题?',
      },
      issuesBody: {
        description:
          '如果问题已关闭，则提交需要一个正文.请输入对提交本身的更长描述',
      },
      issues: {
        description: '添加问题参考(例如"修复 #123"、"重新 #123".)',
      },
    },
  },
};
