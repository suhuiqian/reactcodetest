import type { Meta, StoryObj } from "@storybook/react-vite";
import DataTable from "@/components/DataTable";
import type { InsuredPerson } from "@/components/DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onRowClick: { action: "row-clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data for stories
const sampleData: InsuredPerson[] = [
  {
    id: "1",
    name: "田中 太郎",
    age: 35,
    gender: "male",
    policyNumber: "POL-2024-001",
    status: "active",
    startDate: "2024-01-15",
    premium: 8500,
  },
  {
    id: "2",
    name: "佐藤 花子",
    age: 28,
    gender: "female",
    policyNumber: "POL-2024-002",
    status: "active",
    startDate: "2024-02-01",
    premium: 7200,
  },
  {
    id: "3",
    name: "鈴木 一郎",
    age: 42,
    gender: "male",
    policyNumber: "POL-2024-003",
    status: "pending",
    startDate: "2024-03-10",
    premium: 9500,
  },
  {
    id: "4",
    name: "高橋 美咲",
    age: 31,
    gender: "female",
    policyNumber: "POL-2024-004",
    status: "inactive",
    startDate: "2024-01-20",
    premium: 6800,
  },
  {
    id: "5",
    name: "伊藤 健太",
    age: 39,
    gender: "male",
    policyNumber: "POL-2024-005",
    status: "active",
    startDate: "2024-02-15",
    premium: 8900,
  },
];

const largeDataset: InsuredPerson[] = [
  ...sampleData,
  {
    id: "6",
    name: "渡辺 恵子",
    age: 26,
    gender: "female",
    policyNumber: "POL-2024-006",
    status: "active",
    startDate: "2024-03-01",
    premium: 6500,
  },
  {
    id: "7",
    name: "山田 次郎",
    age: 45,
    gender: "male",
    policyNumber: "POL-2024-007",
    status: "pending",
    startDate: "2024-03-20",
    premium: 10200,
  },
  {
    id: "8",
    name: "中村 由美",
    age: 33,
    gender: "female",
    policyNumber: "POL-2024-008",
    status: "active",
    startDate: "2024-02-28",
    premium: 7800,
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
  },
};

export const WithRowClick: Story = {
  args: {
    data: sampleData,
    onRowClick: (person) => console.log("Clicked:", person),
  },
};

export const LargeDataset: Story = {
  args: {
    data: largeDataset,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const SingleRecord: Story = {
  args: {
    data: [sampleData[0]],
  },
};

export const MixedStatuses: Story = {
  args: {
    data: [
      {
        id: "1",
        name: "田中 太郎",
        age: 35,
        gender: "male",
        policyNumber: "POL-2024-001",
        status: "active",
        startDate: "2024-01-15",
        premium: 8500,
      },
      {
        id: "2",
        name: "佐藤 花子",
        age: 28,
        gender: "female",
        policyNumber: "POL-2024-002",
        status: "inactive",
        startDate: "2024-02-01",
        premium: 7200,
      },
      {
        id: "3",
        name: "鈴木 一郎",
        age: 42,
        gender: "male",
        policyNumber: "POL-2024-003",
        status: "pending",
        startDate: "2024-03-10",
        premium: 9500,
      },
    ],
  },
};
