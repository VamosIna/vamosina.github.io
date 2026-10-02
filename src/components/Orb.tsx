type Props = {
  className?: string;
};

export default function Orb({ className = "" }: Props) {
  return (
    <div className={`orb orb-breathe ${className}`}>
      <div className="orb-halo" />
      <div className="orb-ring orb-ring-slow" />
      <div className="orb-ring-2 orb-ring-rev" />
      <div className="orb-sphere" />
      <div className="orb-moon" />
      <div className="orb-equator" />
    </div>
  );
}
