import type { Meta, StoryObj } from "@storybook/react-vite";
import CupertinoDatePicker from "@/components/CupertinoDatePicker";
import { useState } from "react";

const meta: Meta<typeof CupertinoDatePicker> = {
  title: "Components/CupertinoDatePicker",
  component: CupertinoDatePicker,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["date", "time", "datetime"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    placeholder: {
      control: { type: "text" },
    },
    onChange: { action: "date-changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const DatePickerWrapper = ({
  ...props
}: React.ComponentProps<typeof CupertinoDatePicker>) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    props.value
  );

  return (
    <div style={{ padding: "20px" }}>
      <CupertinoDatePicker
        {...props}
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          props.onChange?.(date);
        }}
      />
      {selectedDate && (
        <div style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
          Selected: {selectedDate.toLocaleString()}
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    placeholder: "日付を選択",
  },
};

export const WithInitialValue: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    value: new Date("2024-03-15"),
    placeholder: "日付を選択",
  },
};

export const TimeMode: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: "time",
    placeholder: "時間を選択",
  },
};

export const DateTimeMode: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    mode: "datetime",
    placeholder: "日時を選択",
  },
};

export const Disabled: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    disabled: true,
    value: new Date("2024-03-15"),
    placeholder: "日付を選択",
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    placeholder: "生年月日を選択してください",
  },
};

export const WithMinMaxDate: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    minDate: new Date("2020-01-01"),
    maxDate: new Date("2030-12-31"),
    placeholder: "日付を選択 (2020-2030)",
  },
};

export const MultiplePickers: Story = {
  render: () => (
    <div
      style={{
        padding: "20px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h4>Date Picker</h4>
        <DatePickerWrapper mode="date" placeholder="日付を選択" />
      </div>
      <div>
        <h4>Time Picker</h4>
        <DatePickerWrapper mode="time" placeholder="時間を選択" />
      </div>
      <div>
        <h4>DateTime Picker</h4>
        <DatePickerWrapper mode="datetime" placeholder="日時を選択" />
      </div>
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
          >
            開始日
          </label>
          <DatePickerWrapper placeholder="開始日を選択" />
        </div>
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
          >
            終了日
          </label>
          <DatePickerWrapper placeholder="終了日を選択" />
        </div>
        <div>
          <label
            style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}
          >
            予約時間
          </label>
          <DatePickerWrapper mode="time" placeholder="時間を選択" />
        </div>
        <button
          type="submit"
          style={{
            padding: "12px 24px",
            backgroundColor: "#007aff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          送信
        </button>
      </form>
    </div>
  ),
};

export const MobileLayout: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    placeholder: "日付を選択",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletLayout: Story = {
  render: (args) => <DatePickerWrapper {...args} />,
  args: {
    placeholder: "日付を選択",
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
