import { DEVICES } from '@pages/Home/homeContent'
import { DeviceCard } from '@pages/Home/components/DeviceCard/DeviceCard'
import styles from './DevicesSection.module.css'

export function DevicesSection() {
  return (
    <section id="devices" className={styles.section} aria-labelledby="devices-heading">
      <h2 id="devices-heading" className={styles.heading}>
        We provide you streaming experience across various devices.
      </h2>
      <p className={styles.subtext}>
        With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our
        platform is designed to be compatible with a wide range of devices, ensuring that you never
        miss a moment of entertainment.
      </p>
      <div className={styles.grid}>
        {DEVICES.map((device) => (
          <DeviceCard key={device.title} icon={device.icon} title={device.title} description={device.description} />
        ))}
      </div>
    </section>
  )
}
