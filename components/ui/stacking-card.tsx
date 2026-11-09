'use client';
import { useTransform, motion, useScroll, MotionValue } from 'framer-motion';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
  tags?: string[];
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  url: string;
  color: string;
  tags?: string[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

// Helper function to get project URL
const getProjectUrl = (title: string) => {
  switch (title) {
    case "Guided tour":
      return "/projects/guided-tour";
    case "Introducing AI recruiter Clara":
      return "/projects/clara";
    case "Productivity and fill rate":
      return "/projects/productivity";
    case "Shift satisfaction":
      return "/projects/shift-satisfaction";
    case "Gamification":
      return "/projects/gamification";
    case "Requesting time off":
      return "/projects/time-off";
    case "Web redesign":
      return "/projects/web-redesign";
    case "Revamping internal management system":
      return "/projects/humadroid";
    default:
      return "#";
  }
};

export const Card = ({
  i,
  title,
  description,
  url,
  color,
  tags,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const [isClient, setIsClient] = useState(false);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const projectUrl = getProjectUrl(title);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        ref={container}
        className='h-screen flex items-center justify-center sticky top-0'
      >
        <a
          href={projectUrl}
          target="_self"
          className="block w-[95%] md:w-[70%] cursor-pointer group"
        >
          <div
            className={`flex flex-col relative -top-[25%] h-auto md:h-[450px] w-full rounded-2xl p-4 md:p-8 lg:p-12 origin-top bg-card border border-border backdrop-blur-sm hover:border-primary/20 transition-colors`}
            style={{ top: `calc(-5vh + ${i * 25}px)` }}
          >
          {/* Mobile Layout: Vertical Stack */}
          <div className={`flex flex-col md:hidden h-full mt-4 gap-4`}>
            {/* Image Section - Mobile */}
            <div className={`relative w-full h-[200px] rounded-lg overflow-hidden`}>
              <div className={`w-full h-full`}>
                <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
              </div>
            </div>

            {/* Content Section - Mobile */}
            <div className={`w-full`}>
              <h2 className='text-xl font-display font-bold text-foreground mb-3'>{title}</h2>
              <p className='text-sm text-foreground leading-relaxed mb-4'>{description}</p>
              {tags && tags.length > 0 && (
                <div className='flex flex-wrap gap-1.5 mb-4'>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium font-sans'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className='flex items-center gap-2 pt-2 min-h-[44px] text-primary'>
                <span className='text-sm font-medium'>View project</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Desktop Layout: Horizontal */}
          <div className={`hidden md:flex h-full mt-6 gap-10`}>
            <div className={`w-[40%] relative top-[10%]`}>
              <h2 className='text-2xl md:text-3xl font-display font-bold text-foreground mb-4'>{title}</h2>
              <p className='text-base text-foreground leading-relaxed mb-6'>{description}</p>
              {tags && tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-4'>
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className='px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium font-sans'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className='flex items-center gap-2 pt-2 text-primary'>
                <span className='text-sm font-medium'>View project</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
            <div className={`relative w-[60%] h-full rounded-lg overflow-hidden `}>
              <div className={`w-full h-full`}>
                <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
              </div>
            </div>
          </div>
          </div>
        </a>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <a
        href={projectUrl}
        target="_self"
        className="block w-[95%] md:w-[70%] cursor-pointer group"
      >
        <motion.div
          style={{
            scale,
            top: `calc(-5vh + ${i * 25}px)`,
          }}
          className={`flex flex-col relative -top-[25%] h-auto md:h-[450px] w-full rounded-2xl p-4 md:p-8 lg:p-12 origin-top bg-card border border-border backdrop-blur-sm hover:border-primary/20 transition-colors`}
        >
        {/* Mobile Layout: Vertical Stack */}
        <div className={`flex flex-col md:hidden h-full mt-4 gap-4`}>
          {/* Image Section - Mobile */}
          <div className={`relative w-full h-[200px] rounded-lg overflow-hidden`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
            </motion.div>
          </div>

          {/* Content Section - Mobile */}
          <div className={`w-full`}>
            <h2 className='text-xl font-display font-bold text-foreground mb-3'>{title}</h2>
            <p className='text-sm text-foreground leading-relaxed mb-4'>{description}</p>
            {tags && tags.length > 0 && (
              <div className='flex flex-wrap gap-1.5 mb-4'>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium font-sans'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <span className='flex items-center gap-2 pt-2 min-h-[44px] text-primary'>
              <span className='text-sm font-medium'>View project</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Desktop Layout: Horizontal */}
        <div className={`hidden md:flex h-full mt-6 gap-10`}>
          <div className={`w-[40%] relative top-[10%]`}>
            <h2 className='text-2xl md:text-3xl font-display font-bold text-foreground mb-4'>{title}</h2>
            <p className='text-base text-foreground leading-relaxed mb-6'>{description}</p>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium font-sans'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <span className='flex items-center gap-2 pt-2 text-primary'>
              <span className='text-sm font-medium'>View project</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div
            className={`relative w-[60%] h-full rounded-lg overflow-hidden `}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
            </motion.div>
          </div>
        </div>
        </motion.div>
      </a>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(({ projects }, ref) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
      <main className='bg-transparent -mt-20' ref={container}>
        <section className='text-foreground w-full bg-transparent'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                tags={project.tags}
                progress={scrollYProgress}
                range={[Math.min(i * 0.25, 0.9), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
  );
});

Component.displayName = 'StackingCard';

export default Component;