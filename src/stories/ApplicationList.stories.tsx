import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { faker } from "@faker-js/faker/locale/ja";
import ApplicationList from "@/components/ApplicationList";
import type { ApplicationData } from "@/components/ApplicationCard";

const meta: Meta<typeof ApplicationList> = {
  title: "Components/ApplicationList",
  component: ApplicationList,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onView: { action: "view clicked" },
    onEdit: { action: "edit clicked" },
    onDelete: { action: "delete clicked" },
    onAddNew: { action: "add new clicked" },
    onBulkDelete: { action: "bulk delete clicked" },
    onBulkSubmit: { action: "bulk submit clicked" },
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

// Generate different sets of applications for different scenarios
const generateApplications = (
  count: number,
  status?: ApplicationData["status"]
) => {
  return Array.from({ length: count }, (_, index) =>
    generateMockApplication({
      id: `app_${String(index + 1).padStart(3, "0")}`,
      status:
        status ||
        faker.helpers.arrayElement([
          "draft",
          "submitted",
          "approved",
          "rejected",
        ]),
    })
  );
};

export const Empty: Story = {
  args: {
    applications: [],
  },
};

export const SingleApplication: Story = {
  args: {
    applications: generateApplications(1),
  },
};

export const MultipleApplications: Story = {
  args: {
    applications: generateApplications(5),
  },
};

export const ManyApplications: Story = {
  args: {
    applications: generateApplications(10),
  },
};

export const AllDraft: Story = {
  args: {
    applications: generateApplications(6, "draft"),
  },
};

export const AllSubmitted: Story = {
  args: {
    applications: generateApplications(6, "submitted"),
  },
};

export const MixedStatus: Story = {
  args: {
    applications: [
      ...generateApplications(3, "draft"),
      ...generateApplications(2, "submitted"),
      ...generateApplications(1, "approved"),
    ],
  },
};

export const WithBulkActions: Story = {
  args: {
    applications: generateApplications(8),
    onBulkDelete: (ids) => console.log("Bulk delete:", ids),
    onBulkSubmit: (ids) => console.log("Bulk submit:", ids),
  },
};

// Interactive story with state management
export const Interactive: Story = {
  render: () => {
    const [applications, setApplications] = React.useState(() =>
      generateApplications(6)
    );

    const handleDelete = (id: string) => {
      setApplications((prev) => prev.filter((app) => app.id !== id));
    };

    const handleBulkDelete = (ids: string[]) => {
      setApplications((prev) => prev.filter((app) => !ids.includes(app.id)));
    };

    const handleBulkSubmit = (ids: string[]) => {
      setApplications((prev) =>
        prev.map((app) =>
          ids.includes(app.id) ? { ...app, status: "submitted" as const } : app
        )
      );
    };

    const handleAddNew = () => {
      const newApp = generateMockApplication({
        id: `app_${String(applications.length + 1).padStart(3, "0")}`,
        status: "draft",
      });
      setApplications((prev) => [...prev, newApp]);
    };

    return (
      <ApplicationList
        applications={applications}
        onView={(id) => console.log("View:", id)}
        onEdit={(id) => console.log("Edit:", id)}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        onBulkDelete={handleBulkDelete}
        onBulkSubmit={handleBulkSubmit}
      />
    );
  },
};

// Story with different premium ranges
export const VariousPremiums: Story = {
  args: {
    applications: [
      generateMockApplication({ insuranceFee: 2500, status: "draft" }),
      generateMockApplication({ insuranceFee: 15000, status: "submitted" }),
      generateMockApplication({ insuranceFee: 45000, status: "approved" }),
      generateMockApplication({ insuranceFee: 80000, status: "rejected" }),
      generateMockApplication({ insuranceFee: 120000, status: "draft" }),
    ],
  },
};

// Story with long names to test text overflow
export const LongNames: Story = {
  args: {
    applications: [
      generateMockApplication({
        beneficiaryName: "田中太郎佐藤次郎山田三郎鈴木四郎高橋五郎",
        insuredPersonName: "佐藤花子山田美咲鈴木愛子高橋恵子田中由美",
        status: "draft",
      }),
      generateMockApplication({
        beneficiaryName: "山田一郎田中二郎佐藤三郎",
        insuredPersonName: "鈴木花子高橋美咲",
        status: "submitted",
      }),
      generateMockApplication({
        beneficiaryName: "高橋太郎",
        insuredPersonName: "田中花子",
        status: "approved",
      }),
    ],
  },
};
