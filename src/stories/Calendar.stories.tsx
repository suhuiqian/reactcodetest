import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Calendar from "@/components/Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onSelect: { action: "date selected" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "日付を選択",
  },
};

export const WithSelectedDate: Story = {
  args: {
    selected: new Date(1990, 5, 15), // June 15, 1990
    placeholder: "生年月日を選択",
  },
};

export const BirthdaySelection: Story = {
  args: {
    placeholder: "生年月日を選択",
    disabled: [
      // Disable future dates for birthday selection
      ...Array.from({ length: 365 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Birthday selection with future dates disabled. This is a better UX for birthday input than the CupertinoDatePicker because it's more familiar to desktop users and provides better accessibility.",
      },
    },
  },
};

export const WithDisabledDates: Story = {
  args: {
    placeholder: "日付を選択",
    disabled: [
      new Date(2024, 0, 1), // New Year's Day
      new Date(2024, 0, 2),
      new Date(2024, 0, 3),
      new Date(2024, 4, 5), // Golden Week
      new Date(2024, 4, 6),
      new Date(2024, 7, 15), // Obon
    ],
  },
};

export const FixedWeeks: Story = {
  args: {
    placeholder: "日付を選択",
    fixedWeeks: true,
  },
};

export const HideOutsideDays: Story = {
  args: {
    placeholder: "日付を選択",
    showOutsideDays: false,
  },
};

// Interactive story for testing
export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    return (
      <div style={{ padding: "20px", maxWidth: "400px" }}>
        <h3 style={{ marginBottom: "16px" }}>Interactive Calendar</h3>
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
          placeholder="生年月日を選択"
        />
        {selectedDate && (
          <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>
            選択された日付: {selectedDate.toLocaleDateString("ja-JP")}
          </p>
        )}
      </div>
    );
  },
};

// Comparison story showing different date input methods
export const DateInputComparison: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    return (
      <div style={{ padding: "20px", maxWidth: "600px" }}>
        <h3 style={{ marginBottom: "20px" }}>Date Input Methods Comparison</h3>

        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <h4 style={{ marginBottom: "8px" }}>
              1. Calendar Picker (Recommended)
            </h4>
            <Calendar
              selected={selectedDate}
              onSelect={setSelectedDate}
              placeholder="生年月日を選択"
            />
            <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              ✅ Familiar desktop pattern, accessible, keyboard navigation
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: "8px" }}>2. Three Dropdowns</h4>
            <div style={{ display: "flex", gap: "8px" }}>
              <select
                style={{
                  padding: "8px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
              >
                <option>年</option>
                {Array.from({ length: 50 }, (_, i) => 1975 + i).map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
              <select
                style={{
                  padding: "8px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
              >
                <option>月</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
              <select
                style={{
                  padding: "8px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                }}
              >
                <option>日</option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day}>{day}</option>
                ))}
              </select>
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              ✅ Fast for known dates, good for mobile
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: "8px" }}>
              3. CupertinoDatePicker (Current)
            </h4>
            <div
              style={{
                padding: "8px 12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                background: "#f9fafb",
                color: "#666",
              }}
            >
              Mobile-style picker (not ideal for desktop)
            </div>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>
              ❌ Mobile-specific, poor accessibility, unfamiliar on desktop
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};
