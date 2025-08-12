import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import "../components/Header.module.css";

// Wrapper component to provide router context
const HeaderWithRouter = (props: React.ComponentProps<typeof Header>) => (
  <BrowserRouter>
    <Header {...props} />
  </BrowserRouter>
);

const meta: Meta<typeof HeaderWithRouter> = {
  title: "Components/Header",
  component: HeaderWithRouter,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header component with logo and navigation text. Supports different navigation states based on current route.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    navText: {
      control: "text",
      description:
        "Optional custom navigation text to override route-based text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - shows header on home page
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default header showing on the home page with "TOPメニュー" text.',
      },
    },
  },
};

// Header with custom navigation text
export const WithCustomNavText: Story = {
  args: {
    navText: "カスタムナビゲーション",
  },
  parameters: {
    docs: {
      description: {
        story: "Header with custom navigation text passed as prop.",
      },
    },
  },
};

// Different navigation states
export const ApplicationPage: Story = {
  args: {
    navText: "12疾病保障付災害保障保険",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header showing on application pages with insurance product name.",
      },
    },
  },
};

export const PrivacyPage: Story = {
  args: {
    navText: "個人情報の取扱い",
  },
  parameters: {
    docs: {
      description: {
        story: "Header showing on privacy policy page.",
      },
    },
  },
};

export const AccountPage: Story = {
  args: {
    navText: "アカウント登録",
  },
  parameters: {
    docs: {
      description: {
        story: "Header showing on account registration/confirmation page.",
      },
    },
  },
};

export const SuccessPage: Story = {
  args: {
    navText: "申し込み完了",
  },
  parameters: {
    docs: {
      description: {
        story: "Header showing on application completion page.",
      },
    },
  },
};

// Responsive design showcase
export const ResponsiveDesign: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Header on mobile device - logo and navigation adapt to smaller screen.",
      },
    },
  },
};

// Tablet view
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
    docs: {
      description: {
        story: "Header on tablet device - medium screen layout.",
      },
    },
  },
};

// Desktop view
export const DesktopView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story: "Header on desktop device - large screen layout.",
      },
    },
  },
};
