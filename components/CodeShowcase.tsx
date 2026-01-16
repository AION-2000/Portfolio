import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ChevronLeft, ChevronRight } from 'lucide-react';

interface CodeSnippet {
  id: number;
  title: string;
  filename: string;
  description: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: 1,
    title: 'Deep Learning Model',
    filename: 'train_classifier.py',
    description: 'TensorFlow model training pipeline',
    code: `import tensorflow as tf
from tensorflow.keras import layers, models

def build_model(input_shape, num_classes):
    """Construct CNN architecture for classification"""
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', 
                     input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model`
  },
  {
    id: 2,
    title: 'Flask API Endpoint',
    filename: 'api_routes.py',
    description: 'RESTful API with image processing',
    code: `from flask import Flask, request, jsonify
from PIL import Image
import numpy as np

app = Flask(__name__)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Handle image classification requests"""
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    # Load and preprocess image
    img = Image.open(request.files['image'])
    img_array = np.array(img.resize((224, 224))) / 255.0
    
    # Run inference
    prediction = model.predict(np.expand_dims(img_array, 0))
    class_idx = np.argmax(prediction[0])
    
    return jsonify({
        'class': class_labels[class_idx],
        'confidence': float(prediction[0][class_idx])
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)`
  },
  {
    id: 3,
    title: 'Data Pipeline',
    filename: 'data_processor.py',
    description: 'ETL pipeline for ML preprocessing',
    code: `import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

class DataPipeline:
    """Handle data preprocessing and feature engineering"""
    
    def __init__(self, data_path: str):
        self.data = pd.read_csv(data_path)
        self.scaler = StandardScaler()
    
    def preprocess(self):
        """Clean and transform raw data"""
        # Remove duplicates and handle missing values
        self.data = self.data.drop_duplicates()
        self.data = self.data.fillna(self.data.median())
        
        # Feature engineering
        X = self.data.drop('target', axis=1)
        y = self.data['target']
        
        # Normalize features
        X_scaled = self.scaler.fit_transform(X)
        
        return train_test_split(
            X_scaled, y, 
            test_size=0.2, 
            random_state=42
        )`
  }
];

const CodeShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = snippets.length - 1;
      if (nextIndex >= snippets.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Syntax highlighting with React components
  const highlightLine = (line: string, lineNum: number) => {
    const tokens: JSX.Element[] = [];
    let currentPos = 0;
    let tokenKey = 0;

    // Helper to add plain text
    const addText = (text: string, className?: string) => {
      if (text) {
        tokens.push(
          <span key={`${lineNum}-${tokenKey++}`} className={className || 'text-latte-300'}>
            {text}
          </span>
        );
      }
    };

    // Simple tokenizer
    const patterns = [
      { regex: /^(def|class|import|from|if|else|elif|for|while|return|try|except|with|as|in|and|or|not|True|False|None)\b/, className: 'text-accent-orange' },
      { regex: /^([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/, className: 'text-accent-blue' },
      { regex: /^(['"])([^\r\n]*?)\1/, className: 'text-accent-green' },
      { regex: /^(#.*)$/, className: 'text-latte-500' },
      { regex: /^(\d+\.?\d*)/, className: 'text-accent-blue opacity-80' },
    ];

    while (currentPos < line.length) {
      let matched = false;

      for (const pattern of patterns) {
        const remaining = line.slice(currentPos);
        const match = remaining.match(pattern.regex);

        if (match && match.index === 0) {
          addText(match[0], pattern.className);
          currentPos += match[0].length;
          matched = true;
          break;
        }
      }

      if (!matched) {
        addText(line[currentPos]);
        currentPos++;
      }
    }

    return (
      <div key={lineNum} className="flex">
        <span className="text-latte-600 select-none mr-4 text-right w-8 flex-shrink-0">
          {(lineNum + 1).toString().padStart(2, ' ')}
        </span>
        <span>{tokens}</span>
      </div>
    );
  };

  const current = snippets[currentIndex];

  return (
    <section id="code" className="py-24 md:py-32 px-6 md:px-12 max-w-6xl mx-auto border-t border-espresso-700">
      <div className="mb-12">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-accent-orange text-xs mb-2 block animate-pulse"
        >
          ● PYTHON SHOWCASE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-mono text-2xl sm:text-3xl md:text-4xl text-latte-100 tracking-tighter"
        >
          cat <span className="text-latte-500">~/code/python/*.py</span>
        </motion.h2>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-espresso-800 border border-espresso-700 shadow-2xl overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-espresso-950 px-4 py-3 flex items-center justify-between border-b border-espresso-700">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
              </div>
              <Code2 className="w-4 h-4 text-latte-500" />
              <span className="font-mono text-xs text-latte-500">{current.filename}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-latte-600">Python 3.x</span>
            </div>
          </div>

          {/* Code Content */}
          <div className="relative min-h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-mono text-lg text-latte-100 mb-1">{current.title}</h3>
                    <p className="font-mono text-xs text-latte-500">// {current.description}</p>
                  </div>

                  <div className="bg-espresso-950 p-4 rounded-sm border border-espresso-700 overflow-x-auto">
                    <div className="font-mono text-xs text-latte-300 leading-relaxed">
                      {current.code.split('\n').map((line, idx) => highlightLine(line, idx))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="bg-espresso-950 px-4 py-3 flex items-center justify-between border-t border-espresso-700">
            <div className="flex gap-2">
              <motion.button
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.05, backgroundColor: '#E67E22' }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-espresso-800 border border-espresso-700 text-latte-500 hover:text-espresso-950 transition-colors"
                data-hover
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.05, backgroundColor: '#E67E22' }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-espresso-800 border border-espresso-700 text-latte-500 hover:text-espresso-950 transition-colors"
                data-hover
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex gap-2">
              {snippets.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                    ? 'bg-accent-orange w-6'
                    : 'bg-espresso-700 hover:bg-latte-600'
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <div className="font-mono text-xs text-latte-600">
              {currentIndex + 1} / {snippets.length}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeShowcase;
