import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useLanguage } from '../contexts/LanguageContext';
import { BlurText } from './luxury/BlurText';
import { motion } from 'framer-motion';
import DotField from './DotField';

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#ffffff', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#ffffff', strokeWidth: 2 } },
];

export default function ReactFlowDemo() {
  const { t } = useLanguage();
  
  const initialNodes = [
    { id: '1', position: { x: 50, y: 50 }, data: { label: t('flow.node1') }, className: 'liquid-glass border-white/20 text-white rounded-xl p-5 shadow-[0_0_30px_rgba(255,255,255,0.05)] font-body-lux tracking-wide backdrop-blur-xl' },
    { id: '2', position: { x: 300, y: 50 }, data: { label: t('flow.node2') }, className: 'bg-white text-black border-white/40 rounded-xl p-5 shadow-[0_0_40px_rgba(255,255,255,0.2)] font-body-lux tracking-wide font-medium' },
    { id: '3', position: { x: 550, y: 50 }, data: { label: t('flow.node3') }, className: 'liquid-glass border-white/20 text-white rounded-xl p-5 shadow-[0_0_30px_rgba(255,255,255,0.05)] font-body-lux tracking-wide backdrop-blur-xl' },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          node.data = { ...node.data, label: t('flow.node1') };
        } else if (node.id === '2') {
          node.data = { ...node.data, label: t('flow.node2') };
        } else if (node.id === '3') {
          node.data = { ...node.data, label: t('flow.node3') };
        }
        return node;
      })
    );
  }, [t, setNodes]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#ffffff', strokeWidth: 2 } }, eds)),
    [setEdges],
  );

  return (
    <section className="py-32 bg-black relative overflow-hidden" id="workflow">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center mb-16 flex flex-col items-center">
          <BlurText 
            text={t('flow.title')} 
            className="text-4xl md:text-5xl lg:text-6xl font-heading-lux italic text-white mb-6 tracking-tight justify-center"
            delay={0.1}
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-body-lux text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            {t('flow.desc')}
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-[600px] w-full rounded-[2rem] border border-white/10 overflow-hidden liquid-glass-strong shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative"
        >
          {/* Custom DotField Background */}
          <div className="absolute inset-0 z-0 opacity-60">
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              bulgeStrength={67}
              glowRadius={160}
              sparkle={false}
              waveAmplitude={0}
              gradientFrom="#ffffff"
              gradientTo="#ffffff"
              glowColor="#ffffff"
            />
          </div>

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-transparent z-10 relative"
          >
            <Controls className="!bg-black/50 !border-white/10 !fill-white backdrop-blur-md rounded-xl overflow-hidden" />
            <MiniMap 
              nodeColor={(node) => {
                switch (node.id) {
                  case '2': return '#ffffff';
                  default: return 'rgba(255,255,255,0.1)';
                }
              }}
              maskColor="rgba(0, 0, 0, 0.6)"
              className="!bg-black/50 !border-white/10 backdrop-blur-md rounded-xl overflow-hidden"
            />
          </ReactFlow>
        </motion.div>
      </div>
    </section>
  );
}
