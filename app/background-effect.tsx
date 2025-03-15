"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export default function BackgroundEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create particles
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const colors = [new THREE.Color(0x87ceeb), new THREE.Color(0xffb6c1)] // Light blue and pink

    for (let i = 0; i < 2000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(2000), // x
        THREE.MathUtils.randFloatSpread(2000), // y
        THREE.MathUtils.randFloatSpread(2000), // z
      )
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))

    const material = new THREE.PointsMaterial({
      size: 2,
      sizeAttenuation: true,
      color: colors[0],
      transparent: true,
      opacity: 0.8,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    camera.position.z = 1000

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      points.rotation.x += 0.0003
      points.rotation.y += 0.0003
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, #000000, #1a1a1a)" }}
    />
  )
}

