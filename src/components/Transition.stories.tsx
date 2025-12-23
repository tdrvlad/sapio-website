/* eslint-disable */

import type { Meta, StoryObj } from "@storybook/react";
import Transition from "./Transition";

const meta: Meta<typeof Transition> = {
  title: "Components/Transition",
  component: Transition,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Transition>;

export const Default: Story = {
  render: () => <Transition />,
};
export const CustomContent: Story = {
  render: () => (
    <Transition
      eyebrow="Our Vision"
      heading="Building the Future of AI Solutions"
      items={[
        {
          number: "01",
          title: "Discovery & Strategy",
          description: "We start by understanding your unique challenges and opportunities, crafting a tailored AI strategy."
        },
        {
          number: "02",
          title: "Design & Development",
          description: "Our experts build robust, scalable AI solutions using cutting-edge technologies and best practices."
        },
        {
          number: "03",
          title: "Deployment & Integration",
          description: "Seamlessly integrate AI into your existing systems with minimal disruption to operations."
        },
        {
          number: "04",
          title: "Ask Us Anything",
          description: "Got questions? Try our AI assistant below. Ask about pricing, timelines, technical capabilities—just like you'd talk to a colleague."
        }
      ]}
    />
  ),
};

