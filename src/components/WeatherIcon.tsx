import React from "react";
import { motion } from "framer-motion";

interface WeatherIconProps {
  iconCode: string;
  description: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconCode,
  description,
  size = 80,
}) => {
  const isDay = iconCode.endsWith("d");
  const iconType = iconCode.substring(0, 2);
  const icons = {
    // Clear sky
    "01": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
        initial={{ rotate: -5 }}
        animate={{ rotate: isDay ? 5 : -5 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {isDay ? (
          <>
            {/* Sun */}
            <motion.circle
              cx="32"
              cy="32"
              r="16"
              fill="#FFAC33"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1.05 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <g>
              {/* Sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="32"
                  y1="32"
                  x2={32 + 20 * Math.cos((angle * Math.PI) / 180)}
                  y2={32 + 20 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#FFAC33"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ opacity: 0.6, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </g>
          </>
        ) : (
          <>
            {/* Moon */}
            <motion.path
              d="M32,12 a20,20 0 0 1 20,20 a20,20 0 0 1-20,20 a20,20 0 0 1 0-40 z"
              fill="#FFD983"
              initial={{ rotate: -5 }}
              animate={{ rotate: 5 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M42,14 a16,16 0 0 0 0,32 a20,20 0 0 1 0-32 z"
              fill="#41474B"
              fillOpacity="0.15"
            />
            {/* Stars */}
            {[
              { cx: 15, cy: 15, r: 1 },
              { cx: 52, cy: 12, r: 1.2 },
              { cx: 56, cy: 32, r: 0.8 },
              { cx: 47, cy: 54, r: 1 },
              { cx: 20, cy: 56, r: 1.1 },
            ].map((star, i) => (
              <motion.circle
                key={i}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="#FFFFFF"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}
          </>
        )}
      </motion.svg>
    ),
    // Few clouds
    "02": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Sun or Moon */}
        <motion.circle
          cx="22"
          cy="22"
          r="12"
          fill={isDay ? "#FFAC33" : "#FFD983"}
          initial={{ scale: 0.9, opacity: 0.9 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Cloud */}
        <motion.path
          d="M46,36c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,21.8,28,19,23.5,19c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,30.2,12.2,30,12,30c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#FFFFFF"
          stroke="#CCCCCC"
          strokeWidth="1"
          initial={{ y: 2 }}
          animate={{ y: -2 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Cloud highlight */}
        <motion.path
          d="M25,32c0-3.9,3.1-7,7-7c2.7,0,5,1.5,6.2,3.7c0.5-0.2,1.1-0.3,1.8-0.3c2.8,0,5,2.2,5,5c0,0.3,0,0.6-0.1,0.9c0.5-0.5,1.2-0.9,2.1-0.9 c1.4,0,2.5,1.1,2.5,2.5s-1.1,2.5-2.5,2.5H25"
          fill="#E6E6E6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    ),
    // Scattered or broken clouds
    "03": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Larger cloud */}
        <motion.path
          d="M46,35c0-6.1-4.9-11-11-11c-3.6,0-6.9,1.8-8.9,4.5C25.4,28.2,24.7,28,24,28c-2.8,0-5,2.2-5,5c0,0.2,0,0.4,0,0.6 C18.8,33.2,18.4,33,18,33c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#FFFFFF"
          stroke="#CCCCCC"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: -3 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Smaller cloud */}
        <motion.path
          d="M17,35c0-2.8,2.2-5,5-5c1.4,0,2.6,0.6,3.5,1.5C26.3,30.6,27.6,30,29,30c3.3,0,6,2.7,6,6c0,0.3,0,0.7-0.1,1 c0.4-0.3,0.9-0.5,1.5-0.5c1.4,0,2.5,1.1,2.5,2.5s-1.1,2.5-2.5,2.5H16c-2.2,0-4-1.8-4-4S14.8,35,17,35z"
          fill="#E6E6E6"
          initial={{ x: 0 }}
          animate={{ x: 4 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    ),
    // Overcast clouds
    "04": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Background cloud */}
        <motion.path
          d="M18,26c0-6.1,4.9-11,11-11c4.3,0,8,2.5,9.8,6c0.5-0.1,1.1-0.2,1.7-0.2c4.4,0,8,3.6,8,8c0,0.2,0,0.4,0,0.6 c0.2-0.1,0.3-0.1,0.5-0.1c1.4,0,2.5,1.1,2.5,2.5S44.4,34,43,34H19c-3.9,0-7-3.1-7-7"
          fill="#B4B4B4"
          initial={{ y: 2 }}
          animate={{ y: -2 }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Foreground cloud */}
        <motion.path
          d="M46,36c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,21.8,28,19,23.5,19c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,30.2,12.2,30,12,30c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#CCCCCC"
          stroke="#B4B4B4"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: 2 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Cloud highlight */}
        <motion.path
          d="M35,29c-3.9,0-7,3.1-7,7c0,0.2,0,0.4,0,0.6C27.7,36.2,27.4,36,27,36c-1.7,0-3,1.3-3,3s1.3,3,3,3h14c1.7,0,3-1.3,3-3 s-1.3-3-3-3c-0.2,0-0.4,0-0.6,0.1C39.8,31.8,37.6,29,35,29z"
          fill="#FFFFFF"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    ),
    // Shower rain
    "09": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Cloud */}
        <motion.path
          d="M46,23c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,8.8,28,6,23.5,6c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,17.2,12.2,17,12,17c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#CCCCCC"
          stroke="#BBBBBB"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: -2 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Raindrops */}
        {[
          { x: 20, y: 38, delay: 0 },
          { x: 30, y: 38, delay: 0.4 },
          { x: 40, y: 38, delay: 0.8 },
          { x: 15, y: 48, delay: 0.2 },
          { x: 25, y: 48, delay: 0.6 },
          { x: 35, y: 48, delay: 1 },
          { x: 45, y: 48, delay: 0.3 },
        ].map((drop, i) => (
          <motion.path
            key={i}
            d={`M${drop.x},${drop.y} c0,0 1,5 3,5 s3-5 3-5 s-1-1.5-3-1.5 S${drop.x},${drop.y} ${drop.x},${drop.y}z`}
            fill="#5DADEC"
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: 15,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: drop.delay,
              ease: "easeIn",
            }}
          />
        ))}
      </motion.svg>
    ),
    // Rain
    "10": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Sun or Moon */}
        {isDay && (
          <motion.circle
            cx="20"
            cy="20"
            r="10"
            fill="#FFAC33"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.05 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )}
        {!isDay && (
          <motion.path
            d="M22,10 a15,15 0 0 1 15,15 a15,15 0 0 1-15,15 a15,15 0 0 1 0-30 z"
            fill="#FFD983"
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        )}

        {/* Cloud */}
        <motion.path
          d="M46,25c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,10.8,28,8,23.5,8c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,19.2,12.2,19,12,19c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#FFFFFF"
          stroke="#CCCCCC"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: -2 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Raindrops */}
        {[
          { x: 25, y: 42, delay: 0.2 },
          { x: 35, y: 42, delay: 0.7 },
          { x: 20, y: 50, delay: 0.5 },
          { x: 30, y: 50, delay: 0 },
          { x: 40, y: 50, delay: 0.9 },
        ].map((drop, i) => (
          <motion.line
            key={i}
            x1={drop.x}
            y1={drop.y}
            x2={drop.x}
            y2={drop.y + 6}
            stroke="#5DADEC"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ y: -10, opacity: 0 }}
            animate={{
              y: 12,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: drop.delay,
            }}
          />
        ))}
      </motion.svg>
    ),
    // Thunderstorm
    "11": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Cloud */}
        <motion.path
          d="M46,23c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,8.8,28,6,23.5,6c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,17.2,12.2,17,12,17c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#6B6B6B"
          stroke="#555555"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: -2 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Lightning */}
        <motion.path
          d="M32,27 L28,40 L33,40 L29,53 L38,37 L32,37 L36,27 Z"
          fill="#FFCC32"
          initial={{ opacity: 0.3, scale: 0.95 }}
          animate={{
            opacity: [0.3, 1, 0.5],
            scale: [0.95, 1.05, 1],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeOut",
          }}
        />

        {/* Rain drops */}
        {[
          { x: 20, y: 40, delay: 0.2 },
          { x: 42, y: 40, delay: 0.5 },
        ].map((drop, i) => (
          <motion.line
            key={i}
            x1={drop.x}
            y1={drop.y}
            x2={drop.x}
            y2={drop.y + 5}
            stroke="#5DADEC"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ y: -5, opacity: 0 }}
            animate={{
              y: 10,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: drop.delay,
            }}
          />
        ))}
      </motion.svg>
    ),
    // Snow
    "13": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {/* Cloud */}
        <motion.path
          d="M46,25c0-6.1-4.9-11-11-11c-0.7,0-1.4,0.1-2.1,0.2C31.7,10.8,28,8,23.5,8c-6.1,0-11,4.9-11,11c0,0.2,0,0.4,0,0.6 C12.3,19.2,12.2,19,12,19c-3.9,0-7,3.1-7,7s3.1,7,7,7h28c3.9,0,7-3.1,7-7"
          fill="#FFFFFF"
          stroke="#EEEEEE"
          strokeWidth="1"
          initial={{ y: 0 }}
          animate={{ y: -2 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* Snowflakes */}
        {[
          { x: 20, y: 40, delay: 0.2 },
          { x: 28, y: 44, delay: 0.5 },
          { x: 36, y: 39, delay: 0.1 },
          { x: 44, y: 45, delay: 0.7 },
          { x: 24, y: 48, delay: 0.4 },
          { x: 32, y: 52, delay: 0.3 },
          { x: 40, y: 50, delay: 0.6 },
        ].map((flake, i) => (
          <g key={i}>
            <motion.circle
              cx={flake.x}
              cy={flake.y}
              r={1.5}
              fill="#FFFFFF"
              stroke="#EEEEEE"
              strokeWidth="0.5"
              initial={{ y: -10, opacity: 0 }}
              animate={{
                y: 10,
                opacity: [0, 1, 0],
                rotate: 180,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: flake.delay,
                ease: "linear",
              }}
            />
            {/* Snowflake arms */}
            {[0, 60, 120].map((angle, j) => (
              <motion.line
                key={`arm-${j}`}
                x1={flake.x}
                y1={flake.y}
                x2={flake.x + 2.5 * Math.cos((angle * Math.PI) / 180)}
                y2={flake.y + 2.5 * Math.sin((angle * Math.PI) / 180)}
                stroke="#FFFFFF"
                strokeWidth="0.5"
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: 10,
                  opacity: [0, 1, 0],
                  rotate: 180,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: flake.delay,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        ))}
      </motion.svg>
    ),
    // Mist/fog
    "50": () => (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={size}
        height={size}
      >
        {[
          { y: 24, width: 40, opacity: 0.8, delay: 0 },
          { y: 32, width: 52, opacity: 0.6, delay: 0.3 },
          { y: 40, width: 45, opacity: 0.7, delay: 0.1 },
          { y: 48, width: 50, opacity: 0.5, delay: 0.4 },
        ].map((fog, i) => (
          <motion.rect
            key={i}
            x={(64 - fog.width) / 2}
            y={fog.y}
            width={fog.width}
            height={3}
            rx={1.5}
            fill="#BBBBBB"
            initial={{ opacity: fog.opacity * 0.7, x: -5 }}
            animate={{
              opacity: [fog.opacity * 0.7, fog.opacity, fog.opacity * 0.7],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: fog.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    ),
  };

  const IconComponent = icons[iconType as keyof typeof icons] || icons["01"];

  return (
    <div
      className="inline-flex items-center justify-center"
      title={description}
    >
      <IconComponent />
    </div>
  );
};

export default WeatherIcon;
