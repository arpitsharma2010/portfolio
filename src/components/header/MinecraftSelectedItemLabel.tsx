export interface SelectedItemAnnouncement {
  token: number;
  itemName: string;
  displayLabel: string;
}

interface MinecraftSelectedItemLabelProps {
  announcement: SelectedItemAnnouncement | null;
}

const MinecraftSelectedItemLabel = ({ announcement }: MinecraftSelectedItemLabelProps) => (
    <div
      className={`minecraft-selected-label${announcement ? " is-visible" : ""}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement && (
        <>
          <strong>{announcement.itemName}</strong>
          <span>{announcement.displayLabel}</span>
        </>
      )}
    </div>
  );

export default MinecraftSelectedItemLabel;
