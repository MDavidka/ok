"use client"
import { motion } from "framer-motion"
export function Stagger({ children }: { children: React.ReactNode }) { return <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>{children}</motion.div> }
