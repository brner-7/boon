"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import ProfileCard from "./profile-card"
import BackgroundEffect from "./background-effect"
import CustomCursor from "./custom-cursor"
import { Moon, Sun } from "lucide-react"

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const [isDarkMode, setIsDarkMode] = useState(false)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const members = [
    {
      name: "Bence Redmond",
      role: "Squad Leader",
      bio: "An elite gooner with over sixteen years of experience on the field. Known not for his physical stature, but for his elite mastery of the stroke and ability to keep the team in composure under stress.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xiwxrfYxuISyXyoZJqe8P95CDMgaaM.png",
    },
    {
      name: "Ryan Morrissey",
      role: "Main team offense",
      bio: "A newcomer to the field, recognised for Europe's quickest rise to Grandmaster Baiter in Jerkmate Ranked. Renowned for his revolutionary swift and dexterous technique which has disrupted the gooner space worldwide.",
      image: "/Ryan.jpeg",
    },
    {
      name: "Cian McNamara",
      role: "Chief Technical Gooner",
      bio: "A pivotal player in the rise of competitive gooning. Known for inventing and improving essential stroke techniques from the past 2 decades - he is dedicated to utilising classic and modern gooning to gain the edge over competitors.",
      image: "/Cian.jpeg",
    },
    {
      name: "Patrick Hoade Syms",
      role: "Executive Laboratory Specialist",
      bio: "Team lead in the production and distribution of amphetamines to enhance the team's longevity, stamina, and power. A maestro in goonological chemistry for performance enhancement.",
      image: "/Patrick.jpeg",
    },
    {
      name: "Tom Byrne",
      role: "Defensive Stroker",
      bio: "A ground-breaking gooner with an over 78% win rate on Jerkmate one-on-one matchups. An intelligent strategist is knowing when to hold back and keep the team stable",
      image: "/Tom.jpeg",
    },
    {
      name: "Rory Linnane",
      role: "Rising Goonacademy Star",
      bio: "A top 10 contender in worldwide U21 goon leagues. Immense physical prowess and talent puts him as one of the most intimidating young gooners with an over nine foot shot at a lethal 37,000 PSI",
      image: "/Rory.jpeg",
    },
    {
      name: "David Moore",
      role: "Freak Optimiser",
      bio: "The internationally known 'Freak Boy'. With over 600,000 followers on JerkMate Community, David has an extremly high goon morale and team spirit.",
      image: "/David.jpeg",
    },
    {
      name: "Aaron O'Doherty",
      role: "Rotational Strategist Gooner",
      bio: "Aaron is a top 5 participant in the continental 'Goon Games' and another rising star within the goon scene. A strong mix of technical and strategic ability.",
      image: "/Aaron.jpeg",
    },
    
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-background transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <CustomCursor />
      <BackgroundEffect />

      <Button variant="ghost" size="icon" className="fixed top-4 right-4 z-50" onClick={toggleDarkMode}>
        {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </Button>

      <div className="relative z-10">
        <section className="min-h-screen flex flex-col items-center justify-center p-4">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-primary mb-6 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.0, ease: "easeOut" }}
          >
            Goon Squad
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground text-center max-w-2xl mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.0, ease: "easeOut", delay: 0.0 }}
          >
            Ireland's premiere elite gooner team. Pushing boundaries over the edge. 
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
            <p className="text-muted-foreground text-center">Scroll down to meet the squad</p>
            <div className="mt-2 animate-bounce flex justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto space-y-32">
            {members.map((member, index) => (
              <ProfileCard key={member.name} member={member} index={index} progress={scrollYProgress} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

