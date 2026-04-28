"use client"
import { motion } from "framer-motion"
export function MotionCard({ children }: { children: React.ReactNode }) { return <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>{children}</motion.div> }
