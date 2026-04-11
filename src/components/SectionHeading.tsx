import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const SectionHeading = ({ title, subtitle, center = true }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`mb-12 md:mb-16 ${center ? "text-center" : ""}`}
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
    <div className={`mt-5 h-1.5 w-16 bg-accent rounded-full ${center ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionHeading;
