import React, {
  useState,
  useEffect,
  createPortal,
  useRef,
  useCallback,
} from "react";

// ========== MODAL EXAMPLE ==========
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      const previousActiveElement = document.activeElement as HTMLElement;
      modalRef.current?.focus();

      return () => {
        previousActiveElement?.focus();
      };
    }
  }, [isOpen]);

  // Escape key handling
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className="p-6">
          {title && (
            <h2 id="modal-title" className="text-xl font-bold mb-4">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ========== TOOLTIP EXAMPLE ==========
interface TooltipProps {
  children: React.ReactNode;
  content: string;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  delay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      });

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    },
    [delay]
  );

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            className="absolute bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap z-50 pointer-events-none"
            style={{
              left: position.x,
              top: position.y,
              transform: "translateX(-50%) translateY(-100%)",
            }}
          >
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
          </div>,
          document.body
        )}
    </>
  );
};

// ========== DROPDOWN EXAMPLE ==========
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  placement = "bottom-left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let x = rect.left + scrollX;
    let y = rect.bottom + scrollY;

    // Adjust based on placement
    switch (placement) {
      case "bottom-right":
        x = rect.right + scrollX;
        break;
      case "top-left":
        y = rect.top + scrollY;
        break;
      case "top-right":
        x = rect.right + scrollX;
        y = rect.top + scrollY;
        break;
    }

    setPosition({ x, y });
  }, [placement]);

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      calculatePosition();
    }
    setIsOpen(!isOpen);
  }, [isOpen, calculatePosition]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>

      {isOpen &&
        createPortal(
          <div
            className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-50"
            style={{
              left: position.x,
              top: position.y,
              transform: placement.includes("right")
                ? "translateX(-100%)"
                : "none",
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};

// ========== FLOATING UI EXAMPLE ==========
interface FloatingPanelProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const FloatingPanel: React.FC<FloatingPanelProps> = ({
  children,
  isVisible,
  onClose,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!panelRef.current) return;

    const rect = panelRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return createPortal(
    <div
      ref={panelRef}
      className="absolute bg-white border border-gray-300 rounded-lg shadow-lg z-50 min-w-80"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div
        className="bg-gray-100 px-4 py-2 rounded-t-lg flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="font-medium">Floating Panel</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ×
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>,
    document.body
  );
};

// ========== FULLSCREEN OVERLAY EXAMPLE ==========
const FullscreenLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>,
    document.body
  );
};

// ========== MAIN DEMO COMPONENT ==========
const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        React Portal Examples & Best Practices
      </h1>

      {/* Modal Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">1. Modal Dialog</h2>
        <p className="mb-4 text-gray-600">
          Portals ensure modals appear above all content, regardless of parent
          container constraints.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Modal
        </button>

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
        >
          <p className="mb-4">
            This modal is rendered using createPortal, so it appears above all
            other content regardless of parent container z-index or overflow
            settings.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </Modal>
      </section>

      {/* Tooltip Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">2. Tooltips</h2>
        <p className="mb-4 text-gray-600">
          Tooltips need to escape parent containers to avoid clipping.
        </p>
        <div className="space-y-2">
          <p>
            Hover over{" "}
            <Tooltip content="This tooltip uses a portal!">
              <span className="text-blue-500 underline cursor-help">
                this text
              </span>
            </Tooltip>{" "}
            to see a tooltip.
          </p>
          <p>
            Also try{" "}
            <Tooltip content="Another portal tooltip with different content!">
              <span className="text-green-500 underline cursor-help">
                this one
              </span>
            </Tooltip>
            .
          </p>
        </div>
      </section>

      {/* Dropdown Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">3. Dropdown Menus</h2>
        <p className="mb-4 text-gray-600">
          Dropdowns in portals can extend beyond parent boundaries.
        </p>
        <div className="flex gap-4">
          <Dropdown
            trigger={
              <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Bottom Left ▼
              </button>
            }
            placement="bottom-left"
          >
            <div className="py-1">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Option 1
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Option 2
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Option 3
              </div>
            </div>
          </Dropdown>

          <Dropdown
            trigger={
              <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
                Bottom Right ▼
              </button>
            }
            placement="bottom-right"
          >
            <div className="py-1">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Action A
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Action B
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Action C
              </div>
            </div>
          </Dropdown>
        </div>
      </section>

      {/* Floating Panel Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">4. Draggable Floating Panel</h2>
        <p className="mb-4 text-gray-600">
          A draggable panel that floats above all content.
        </p>
        <button
          onClick={() => setPanelVisible(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Show Floating Panel
        </button>

        <FloatingPanel
          isVisible={panelVisible}
          onClose={() => setPanelVisible(false)}
        >
          <div className="space-y-4">
            <p>This is a draggable floating panel!</p>
            <p>Drag from the header to move it around.</p>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Panel Action
            </button>
          </div>
        </FloatingPanel>
      </section>

      {/* Fullscreen Overlay Example */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          5. Fullscreen Loading Overlay
        </h2>
        <p className="mb-4 text-gray-600">
          Global loading states that block all interaction.
        </p>
        <button
          onClick={simulateLoading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Simulate Loading (3s)
        </button>

        <FullscreenLoader isLoading={loading} />
      </section>

      {/* Best Practices Section */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">🎯 Portal Best Practices</h2>
        <ul className="space-y-2 text-sm">
          <li>
            ✅ <strong>Use for overlays:</strong> Modals, tooltips, dropdowns,
            notifications
          </li>
          <li>
            ✅ <strong>Focus management:</strong> Handle keyboard navigation
            properly
          </li>
          <li>
            ✅ <strong>Event handling:</strong> Remember events bubble through
            React tree, not DOM
          </li>
          <li>
            ✅ <strong>Cleanup:</strong> Remove event listeners and clear
            timeouts
          </li>
          <li>
            ✅ <strong>Accessibility:</strong> Use proper ARIA attributes and
            roles
          </li>
          <li>
            ❌ <strong>Don't overuse:</strong> Regular components don't need
            portals
          </li>
          <li>
            ❌ <strong>Avoid complex nesting:</strong> Keep portal content
            simple
          </li>
        </ul>
      </section>
    </div>
  );
};

export default App;
