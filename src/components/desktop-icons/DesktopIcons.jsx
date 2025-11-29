import disk from "@/assets/disk-icon.svg";
import folder from "@/assets/folder-icon.svg";
import picture from "@/assets/image-icon.svg";
import music from "@/assets/music-icon.svg";
import paint from "@/assets/paint-icon.svg";
import internet from "@/assets/web-icon.svg";
import "./DesktopIcons.css"

export const DesktopIcons = () => {
    const icons = [
        { src: disk, label: "DISK" },
        { src: folder, label: "FOLDERS" },
        { src: picture, label: "PICTURES" },
        { src: music, label: "MUSIC" },
        { src: paint, label: "PAINT" },
        { src: internet, label: "INTERNET" }
    ]

    const leftIcons = icons.slice(0, 3);
    const rightIcons = icons.slice(3);

    return (
        <div className="desktop-icons">
            <div className="icons-left">
                {leftIcons.map(icon => (
                    <div key={icon.label} className="desktop-icon">
                        <img src={icon.src} alt={icon.label}/>
                        <span>{icon.label}</span>
                    </div>
                ))}
            </div>

            <div className="icons-right">
                {rightIcons.map(icon => (
                    <div key={icon.label} className="desktop-icon">
                        <img src={icon.src} alt={icon.label}/>
                        <span>{icon.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}