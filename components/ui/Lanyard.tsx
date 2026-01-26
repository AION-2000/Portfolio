'use client';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

export default function Lanyard() {
    return (
        <div className="w-full h-full bg-espresso-950 border border-espresso-700 pointer-events-auto">
            <Suspense fallback={<div className="text-white text-[10px]">Loading...</div>}>
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.5} />
                    <mesh>
                        <boxGeometry />
                        <meshStandardMaterial color="cyan" />
                    </mesh>
                </Canvas>
            </Suspense>
        </div>
    );
}
