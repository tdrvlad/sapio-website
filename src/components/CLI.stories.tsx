import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CLI } from './CLI';

const meta = {
  title: 'Components/CLI',
  component: CLI,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'darker',
          value: '#0a0a0a',
        },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CLI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
      },
    ],
    suggestions: [
      "What kind of AI solutions do you build?",
      "Can you integrate with on-premise systems?",
      "Show me a Sapio project in legal tech.",
      "How fast can an MVP be developed?",
      "How does a technical audit work?",
    ],
  },
};

export const WithConversation: Story = {
  args: {
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
      },
      {
        type: 'command',
        content: 'What kind of AI solutions do you build?',
      },
      {
        type: 'output',
        content: 'We build custom AI solutions including:\n- Chatbots and conversational AI\n- Computer vision systems\n- Speech recognition and processing\n- Data science and analytics\n- AI agents and automation',
      },
      {
        type: 'command',
        content: 'Can you integrate with on-premise systems?',
      },
      {
        type: 'output',
        content: 'Yes, we can integrate AI solutions with on-premise systems. We work with various deployment options including private cloud, hybrid setups, and fully on-premise installations.',
      },
    ],
    suggestions: [
      "Show me a Sapio project in legal tech.",
      "How fast can an MVP be developed?",
      "How does a technical audit work?",
    ],
  },
};

export const WithError: Story = {
  args: {
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
      },
      {
        type: 'command',
        content: 'invalid command',
      },
      {
        type: 'error',
        content: 'Command not recognized. Please ask a question about our AI solutions or services.',
      },
    ],
    suggestions: [
      "What kind of AI solutions do you build?",
      "Can you integrate with on-premise systems?",
    ],
  },
};

export const CustomPrompt: Story = {
  args: {
    prompt: 'user@sapio:~$',
    accentColor: '#00ff88',
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
      },
    ],
    suggestions: [
      "What kind of AI solutions do you build?",
      "Can you integrate with on-premise systems?",
    ],
  },
};

export const Compact: Story = {
  args: {
    maxHeight: '400px',
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI.",
      },
    ],
    suggestions: [
      "What kind of AI solutions do you build?",
      "Can you integrate with on-premise systems?",
    ],
  },
};

export const WithTimestamps: Story = {
  args: {
    showTimestamp: true,
    messages: [
      {
        type: 'banner',
        content: 'Sapio AI',
        timestamp: '10:00:00',
      },
      {
        type: 'info',
        content: "Welcome! I'm Sapio AI, ready to help you build custom AI solutions.",
        timestamp: '10:00:01',
      },
      {
        type: 'command',
        content: 'What kind of AI solutions do you build?',
        timestamp: '10:00:15',
      },
      {
        type: 'output',
        content: 'We build custom AI solutions including chatbots, computer vision, speech recognition, and more.',
        timestamp: '10:00:16',
      },
    ],
    suggestions: [
      "Can you integrate with on-premise systems?",
      "Show me a Sapio project in legal tech.",
    ],
  },
};
