import confetti from 'canvas-confetti';

/**
 * Efecto de confeti y celebración para el clímax de la revelación
 */
export function launchCelebration() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Paleta de colores cálida y dorada para celebración familiar
  const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#fbbf24', '#f43f5e', '#ffffff'];

  // Explosión inicial desde el centro
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.2,
  });

  // Ráfagas laterales continuas
  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 25 * (timeLeft / duration);

    // Lado izquierdo
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });

    // Lado derecho
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });
  }, 250);
}

