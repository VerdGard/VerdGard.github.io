/**
 * ManTa Landing Page — Main JS
 * SoloSu 2026
 *
 * Features:
 * - Navbar scroll effect
 * - Intersection Observer for reveal animations
 * - Smooth scroll for anchor links
 * - Respects prefers-reduced-motion
 */

;(function () {
  'use strict'

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---- 1. Navbar scroll ----
  const navbar = document.querySelector('.navbar')
  let lastScrollY = 0

  function updateNavbar() {
    const scrollY = window.scrollY
    if (scrollY > 30) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
    lastScrollY = scrollY
  }

  window.addEventListener('scroll', updateNavbar, { passive: true })
  updateNavbar() // initial

  // ---- 2. Scroll reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal')

  if (!isReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    revealElements.forEach((el) => revealObserver.observe(el))
  } else {
    // No motion or no observer support — show all immediately
    revealElements.forEach((el) => el.classList.add('visible'))
  }

  // ---- 3. Smooth anchor scrolling (for browsers that don't support scroll-behavior) ----
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (!targetId || targetId === '#') return

      const target = document.querySelector(targetId)
      if (!target) return

      e.preventDefault()

      const navHeight = navbar ? navbar.offsetHeight : 0
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight

      window.scrollTo({
        top: targetTop,
        behavior: isReducedMotion ? 'auto' : 'smooth',
      })
    })
  })

  // ---- 4. Anime card interaction (optional enhancement) ----
  // Nothing complex needed; hover states are in CSS
  // But we add a small log for the bookmark button
  document.querySelectorAll('.anime-card-bookmark').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation()
      const card = this.closest('.anime-card')
      const title = card?.querySelector('.anime-card-title')?.textContent || '未知'
      console.log(`[ManTa] Bookmark toggled: ${title}`)
      // In production, this would trigger a save action
    })
  })

  // ---- 5. Lazy image loading (native) ----
  // All <img> tags that should lazy-load already have loading="lazy" in HTML

  console.log('[ManTa] Landing page initialized.')
})()

/**
 * Inline SVG icon helper (used in HTML as <svg>)
 * To keep HTML clean, all icons are inlined in HTML.
 * This file is purely for behavior.
 */
</｜｜DSML｜｜>
