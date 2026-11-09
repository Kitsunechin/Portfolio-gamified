"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    if (!isClient) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      if (autoRotate && viewMode === "orbital") {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        setRotationAngle((prev) => {
          // Slower rotation for better readability
          const rotationSpeed = 0.005; // degrees per millisecond
          const newAngle = (prev + rotationSpeed * deltaTime) % 360;
          return newAngle;
        });

        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (autoRotate && viewMode === "orbital") {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoRotate, viewMode, isClient]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 280;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-foreground bg-primary border-primary";
      case "in-progress":
        return "text-background bg-foreground border-foreground";
      case "pending":
        return "text-foreground bg-muted border-border";
      default:
        return "text-foreground bg-muted border-border";
    }
  };

  // Prevent hydration mismatch by not rendering animation until client-side
  if (!isClient) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-background overflow-hidden">
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center scale-125">
          <div className="absolute w-full h-full flex items-center justify-center">
            <div
              className="absolute w-16 h-16 rounded-full flex items-center justify-center z-10"
              style={{ background: "radial-gradient(circle at 35% 30%, hsl(var(--foreground)), hsl(var(--primary)) 45%, hsl(var(--background)) 100%)" }}
            >
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: "hsl(var(--primary) / 0.8)" }}></div>
            </div>
            <div className="absolute w-[560px] h-[560px] rounded-full border border-primary/10"></div>
            {timelineData.map((item, index) => {
              const angle = (index / timelineData.length) * 360;
              const radius = 280;
              const radian = (angle * Math.PI) / 180;
              const x = radius * Math.cos(radian);
              const y = radius * Math.sin(radian);
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="absolute transition-all duration-700"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, 0)`,
                    zIndex: 100,
                    opacity: 0.8,
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-card text-foreground border-2 border-border">
                    <Icon size={16} />
                  </div>
                  <div className="absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider text-muted-foreground">
                    {item.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-background overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-5xl h-full flex items-center justify-center scale-125">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px) translateZ(0)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
        >
          <div className="absolute w-20 h-20 rounded-full flex items-center justify-center z-10">
            {/* Outer glow layers */}
            <div className="absolute w-32 h-32 rounded-full blur-2xl animate-pulse" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)" }}></div>
            <div className="absolute w-24 h-24 rounded-full blur-xl animate-pulse" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.45), transparent 70%)", animationDelay: "0.3s" }}></div>

            {/* Animated ping rings */}
            <div className="absolute w-20 h-20 rounded-full border animate-ping opacity-70" style={{ borderColor: "hsl(var(--primary) / 0.3)" }}></div>
            <div
              className="absolute w-24 h-24 rounded-full border animate-ping opacity-50"
              style={{ borderColor: "hsl(var(--primary) / 0.2)", animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute w-28 h-28 rounded-full border animate-ping opacity-30"
              style={{ borderColor: "hsl(var(--primary) / 0.1)", animationDelay: "1s" }}
            ></div>

            {/* Main center sphere with shader effect */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              {/* Dark to light gradient base */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 35% 30%, hsl(var(--foreground)), hsl(var(--primary)) 45%, hsl(var(--background)) 100%)" }}></div>

              {/* Radial glow overlay */}
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.3) 60%, transparent 100%)" }}></div>

              {/* Animated shine effect */}
              <div
                className="absolute inset-0 opacity-50 animate-pulse"
                style={{ background: "radial-gradient(circle at 30% 20%, hsl(var(--foreground) / 0.5), transparent 60%)", animationDuration: "3s" }}
              ></div>

              {/* Inner core */}
              <div className="absolute inset-2 rounded-full shadow-inner" style={{ background: "linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary) / 0.85), hsl(var(--primary) / 0.7))" }}></div>
              <div className="absolute inset-3 rounded-full backdrop-blur-sm animate-pulse" style={{ background: "linear-gradient(to bottom right, hsl(var(--primary) / 0.8), hsl(var(--primary) / 0.6), hsl(var(--primary) / 0.4))", animationDuration: "2s" }}></div>

              {/* Highlight spot */}
              <div className="absolute top-2 left-2 w-3 h-3 rounded-full blur-sm" style={{ background: "linear-gradient(to bottom right, hsl(var(--foreground)), hsl(var(--foreground) / 0.5))" }}></div>
            </div>
          </div>

          <div className="absolute w-[560px] h-[560px] rounded-full border border-primary/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden' as const,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-opacity duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-primary text-foreground"
                      : isRelated
                      ? "bg-primary/50 text-foreground"
                      : "bg-card text-foreground"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-primary shadow-lg shadow-primary/30"
                      : isRelated
                      ? "border-primary animate-pulse"
                      : "border-border"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-foreground scale-125" : "text-muted-foreground"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-card/95 backdrop-blur-lg border-border shadow-xl overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-border"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETE"
                            : item.status === "in-progress"
                            ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-foreground">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-border">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-muted-foreground mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-border bg-transparent hover:bg-accent hover:text-accent-foreground transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 opacity-60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
