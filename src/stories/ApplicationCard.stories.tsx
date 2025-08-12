import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { faker } from "@faker-js/faker/locale/ja";
import ApplicationCard from "@/components/ApplicationCard";
import type { ApplicationData } from "@/components/ApplicationCard";

const meta: Meta<typeof ApplicationCard> = {
  title: "Components/ApplicationCard",
  component: ApplicationCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onView: { action: "view clicked" },
    onEdit: { action: "edit clicked" },
    onDelete: { action: "delete clicked" },
    onSelect: { action: "select changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate mock application data
const generateMockApplication = (
  overrides?: Partial<ApplicationData>
): ApplicationData => {
  return {
    id: faker.string.alphanumeric(8),
    beneficiaryName: faker.person.fullName(),
    insuredPersonName: faker.person.fullName(),
    insuranceFee: faker.number.int({ min: 5000, max: 50000 }),
    status: faker.helpers.arrayElement([
      "draft",
      "submitted",
      "approved",
      "rejected",
    ]),
    createdAt: faker.date.recent().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
};

// Generate multiple applications for different scenarios
const mockApplications = Array.from({ length: 5 }, (_, index) =>
  generateMockApplication({
    id: `app_${String(index + 1).padStart(3, "0")}`,
    status: faker.helpers.arrayElement([
      "draft",
      "submitted",
      "approved",
      "rejected",
    ]),
  })
);

export const Default: Story = {
  args: {
    application: mockApplications[0],
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    application: mockApplications[0],
    isSelected: true,
  },
};

export const Draft: Story = {
  args: {
    application: generateMockApplication({ status: "draft" }),
  },
};

export const Submitted: Story = {
  args: {
    application: generateMockApplication({ status: "submitted" }),
  },
};

export const Approved: Story = {
  args: {
    application: generateMockApplication({ status: "approved" }),
  },
};

export const Rejected: Story = {
  args: {
    application: generateMockApplication({ status: "rejected" }),
  },
};

export const WithDeleteButton: Story = {
  args: {
    application: mockApplications[0],
    onDelete: (id) => console.log("Delete application:", id),
  },
};

export const WithSelection: Story = {
  args: {
    application: mockApplications[0],
    isSelected: false,
    onSelect: (id) => console.log("Select application:", id),
  },
};

export const LongNames: Story = {
  args: {
    application: generateMockApplication({
      beneficiaryName: "田中太郎佐藤次郎山田三郎鈴木四郎高橋五郎",
      insuredPersonName: "佐藤花子山田美咲鈴木愛子高橋恵子田中由美",
    }),
  },
};

export const HighPremium: Story = {
  args: {
    application: generateMockApplication({
      insuranceFee: 150000,
    }),
  },
};

export const LowPremium: Story = {
  args: {
    application: generateMockApplication({
      insuranceFee: 2500,
    }),
  },
};

// Grid layout story to show multiple cards
export const Grid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gap: "20px",
        padding: "20px",
        maxWidth: "1200px",
      }}
    >
      {mockApplications.map((app, index) => (
        <ApplicationCard
          key={app.id}
          application={app}
          onView={(id) => console.log("View:", id)}
          onEdit={(id) => console.log("Edit:", id)}
          onDelete={(id) => console.log("Delete:", id)}
          isSelected={index === 0}
          onSelect={(id) => console.log("Select:", id)}
        />
      ))}
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [applications, setApplications] = React.useState(mockApplications);

    const handleDelete = (id: string) => {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    };

    const handleSelect = (id: string) => {
      setSelectedId(selectedId === id ? null : id);
    };

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "20px",
          padding: "20px",
          maxWidth: "1200px",
        }}
      >
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            application={app}
            onView={(id) => console.log("View:", id)}
            onEdit={(id) => console.log("Edit:", id)}
            onDelete={handleDelete}
            isSelected={selectedId === app.id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};
