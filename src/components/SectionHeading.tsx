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
    className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
    {subtitle && <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className={`mt-4 h-1 w-20 bg-accent rounded-full ${center ? "mx-auto" : ""}`} />
  </motion.div>
);

export default SectionHeading;
