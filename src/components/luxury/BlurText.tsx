import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className = "", delay = 0.1 }: BlurTextProps) {
  // Split by space for English, or by characters for Chinese if no spaces are found nicely
  // Actually, a simple approach is to split by spaces. For CJK, we can just split by characters if there are no spaces.
  const hasSpaces = text.includes(" ");
  const elements = hasSpaces ? text.split(" ") : text.split("");
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap ${className}`}
    >
      {elements.map((el, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { filter: 'blur(10px)', opacity: 0, y: 50 },
            visible: { 
              filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], 
              opacity: [0, 0.5, 1], 
              y: [50, -5, 0],
              transition: { 
                duration: 0.7, 
                delay: delay + (i * (hasSpaces ? 0.1 : 0.05)),
                times: [0, 0.5, 1]
              } 
            }
          }}
          className={`${hasSpaces ? 'mr-[0.25em]' : 'mr-[0.02em]'} inline-block`}
        >
          {el}
        </motion.span>
      ))}
    </motion.div>
  );
}
