import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState, ReactElement } from 'react';

import './Dock.css';

interface DockItemProps {
  key?: React.Key;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: any;
  spring: any;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child => {
        if (React.isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, { isHovered });
        }
        return child;
      })}
    </motion.div>
  );
}

function DockLabel({ children, className = '', isHovered }: any) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: any) {
  return <div className={`dock-icon ${className} w-full h-full`}>{children}</div>;
}

export interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  id?: string;
}

export interface DockProps {
  items: DockItemData[];
  className?: string;
  spring?: any;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
  activeItem?: string;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 100,
  baseItemSize = 40,
  activeItem = ''
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height: panelHeight, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          const isActive = activeItem === item.id;
          return (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={`${item.className || ''} relative`}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon>
                {isActive && (
                  <motion.div
                    layoutId="activeNavDock"
                    className="absolute inset-0 bg-primary-container/40 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center justify-center pointer-events-none">
                  {React.isValidElement(item.icon) 
                    ? React.cloneElement(item.icon as ReactElement<any>, { 
                        className: isActive ? 'text-white' : undefined 
                      }) 
                    : item.icon}
                </div>
              </DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
