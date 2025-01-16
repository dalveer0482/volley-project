import { TitleBar } from "@shopify/app-bridge-react";
import { Box, Layout, Page, Tabs } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

import { useCallback, useState } from "react";
import Connect from "./Connect";
import Sync from "./Sync";
import Welcome from "./Welcome";

export default function HomePage() {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { id: "welcome-tab", content: "Welcome" },
    { id: "connect-tab", content: "Connect Your Store" },
    { id: "sync-tab", content: "Start Sync" },
  ];

  const handleTabChange = useCallback((selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  }, []);

  return (
    <Page fullWidth>
      <TitleBar title={t("HomePage.title")} />
      <Layout>
        <Layout.Section>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            <Box style={{ padding: 1, marginTop: 10 }}>
              {selectedTab === 0 && <Welcome />}
              {selectedTab === 1 && <Connect />}
              {selectedTab === 2 && <Sync />}
            </Box>
          </Tabs>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
