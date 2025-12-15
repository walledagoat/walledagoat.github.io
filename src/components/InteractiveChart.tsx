import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const chartData = [
  { x: 0, y: 45000 },
  { x: 1, y: 47500 },
  { x: 2, y: 46200 },
  { x: 3, y: 48900 },
  { x: 4, y: 52300 },
  { x: 5, y: 51000 },
  { x: 6, y: 54200 },
  { x: 7, y: 53800 },
  { x: 8, y: 56100 },
  { x: 9, y: 58500 },
  { x: 10, y: 57200 },
  { x: 11, y: 61000 },
  { x: 12, y: 64500 },
  { x: 13, y: 63200 },
  { x: 14, y: 67800 },
];

const timeRanges = ["1D", "7D", "1M", "1Y"];

const InteractiveChart = () => {
  const [activeRange, setActiveRange] = useState("7D");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const chartRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const width = 800;
  const height = 300;
  const padding = 40;

  const minY = Math.min(...chartData.map((d) => d.y)) * 0.95;
  const maxY = Math.max(...chartData.map((d) => d.y)) * 1.05;

  const scaleX = (x: number) => padding + (x / (chartData.length - 1)) * (width - padding * 2);
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - padding * 2);

  const pathD = chartData
    .map((point, i) => `${i === 0 ? "M" : "L"} ${scaleX(point.x)} ${scaleY(point.y)}`)
    .join(" ");

  const areaD = `${pathD} L ${scaleX(chartData.length - 1)} ${height - padding} L ${scaleX(0)} ${height - padding} Z`;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const relX = (x - padding) / (width - padding * 2);
    const index = Math.round(relX * (chartData.length - 1));
    if (index >= 0 && index < chartData.length) {
      setHoveredPoint(index);
      setMousePos({ x: e.clientX - rect.left, y: scaleY(chartData[index].y) });
    }
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-Time <span className="text-primary">Analysis</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your favorite assets with precision
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center font-bold text-warning-foreground">
                  ₿
                </div>
                <h3 className="text-2xl font-bold">Bitcoin</h3>
                <span className="text-muted-foreground">BTC</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">$67,842.50</span>
                <span className="px-2 py-1 text-sm font-bold rounded bg-success/20 text-success">
                  +4.52%
                </span>
              </div>
            </div>

            {/* Time Range Buttons */}
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeRange === range
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative overflow-hidden">
            <svg
              ref={chartRef}
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-64 md:h-80 cursor-crosshair"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              {/* Grid Lines */}
              {[...Array(5)].map((_, i) => (
                <line
                  key={i}
                  x1={padding}
                  y1={padding + (i * (height - padding * 2)) / 4}
                  x2={width - padding}
                  y2={padding + (i * (height - padding * 2)) / 4}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
              ))}

              {/* Gradient Fill */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>

              <motion.path
                d={areaD}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              />

              <motion.path
                d={pathD}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Hover Point */}
              {hoveredPoint !== null && (
                <>
                  <line
                    x1={scaleX(hoveredPoint)}
                    y1={padding}
                    x2={scaleX(hoveredPoint)}
                    y2={height - padding}
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                  <circle
                    cx={scaleX(hoveredPoint)}
                    cy={scaleY(chartData[hoveredPoint].y)}
                    r="8"
                    fill="hsl(var(--primary))"
                    stroke="hsl(var(--background))"
                    strokeWidth="3"
                  />
                </>
              )}
            </svg>

            {/* Tooltip */}
            {hoveredPoint !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute pointer-events-none glass-card-strong px-4 py-2 rounded-xl"
                style={{
                  left: `${(mousePos.x / width) * 100}%`,
                  top: `${(mousePos.y / height) * 100 - 15}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-bold">${chartData[hoveredPoint].y.toLocaleString()}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveChart;
