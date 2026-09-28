import type { CSSProperties, ReactNode } from 'react';
import { BrandIcon } from '@/components/brand/Logo';
import { BrandShape } from '@/components/brand/BrandShape';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { PrimaryButton } from '@/components/ui/Buttons';
import { FadeIn } from '@/components/ui/FadeIn';

const ABOUT =
  'SoftFix is a software solutions studio. We turn business ideas into reliable digital products — web platforms, business systems and automations that remove friction and help companies grow. More than a contract, it’s a long-term partnership. Let’s build something that works.';

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 overflow-x-clip px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10"
    >
      <Decorations />

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2
            id="about-title"
            className="hero-heading text-center font-display font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About us
          </h2>
        </FadeIn>
        <AnimatedText
          text={ABOUT}
          className="max-w-[580px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-ink"
          wordClassName={(word) => (/^(long-term|partnership\.|works\.)$/.test(word) ? 'text-brand-cyan' : undefined)}
        />
      </div>

      <FadeIn className="relative z-10">
        <PrimaryButton href="#contact">Let’s talk</PrimaryButton>
      </FadeIn>
    </section>
  );
}

function Floating({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <div className="animate-drift" style={style}>
      {children}
    </div>
  );
}

/** Four extruded icon pieces in the corners (reference: 3D objects). */
function Decorations() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute left-[1%] top-[4%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]"
      >
        <Floating style={{ '--t': '12s', '--dx': '8px', '--dy': '-14px', '--r': '-14deg' } as CSSProperties}>
          <BrandShape piece="frameTop" face={['#3B7BFF', '#0038C9']} side="#001E73" className="w-full" />
        </Floating>
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]"
      >
        <Floating style={{ '--t': '14s', '--dx': '-6px', '--dy': '12px', '--r': '10deg' } as CSSProperties}>
          <BrandShape piece="check" face={['#004BF6', '#00F2E4']} side="#00318F" className="w-full" />
        </Floating>
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute right-[1%] top-[4%] w-[110px] sm:right-[2%] sm:w-[150px] md:right-[4%] md:w-[190px]"
      >
        <Floating style={{ '--t': '13s', '--dx': '-10px', '--dy': '10px', '--r': '12deg' } as CSSProperties}>
          {/* navy app-tile, as on the brand icon slide */}
          <div className="grid aspect-square w-full place-items-center rounded-[28%] bg-gradient-to-br from-[#1A2C45] to-brand-navy shadow-[0_40px_60px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12),0_10px_0_#07101C] ring-1 ring-white/10">
            <BrandIcon className="w-[58%]" variant="light" frameFill="#fff" />
          </div>
        </Floating>
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]"
      >
        <Floating style={{ '--t': '15s', '--dx': '10px', '--dy': '-12px', '--r': '-9deg' } as CSSProperties}>
          <BrandShape piece="frameBottom" face={['#5BFFF3', '#00C4E6']} side="#007C8F" className="w-full" />
        </Floating>
      </FadeIn>
    </div>
  );
}
