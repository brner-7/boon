"use client"

import { motion, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ProfileCardProps {
  member: {
    name: string
    role: string
    bio: string
    image: string
  }
  index: number
  progress: MotionValue<number>
}

export default function ProfileCard({ member, index, progress }: ProfileCardProps) {
  // Calculate when this card should appear based on scroll position
  const startAppear = index * 0.15

  // Transform scroll progress into opacity for this specific card
  const opacity = useTransform(progress, [startAppear - 0.05, startAppear], [0, 1])

  return (
    <motion.div
      style={{ opacity }}
      className="min-h-[400px] w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden group hover:shadow-2xl transition-shadow duration-300 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-80 md:w-1/2 overflow-hidden">
            <Image
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <CardContent className="relative p-6 md:w-1/2 flex flex-col justify-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary mb-4">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}

