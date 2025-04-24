import React from 'react'
import { motion } from 'framer-motion'

const QXLoadingScreen: React.FC = () => {
  const text = 'QX'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted-darker">
      <h3 className="text-[84px] font-extrabold uppercase tracking-[-0.25em] font-BubbleGumBold">
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block px-1"
            animate={{
              color: ['#BFDBFE', '#3B82F6', '#BFDBFE'],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
              delay: index * 0.1,
            }}
          >
            {char}
          </motion.span>
        ))}
      </h3>
    </div>
  )
}

export default QXLoadingScreen