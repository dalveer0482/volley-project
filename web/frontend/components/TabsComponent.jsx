import { LegacyCard, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";

export function TabsComponent({ tabs }) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}></LegacyCard.Section>
    </Tabs>
  );
}
