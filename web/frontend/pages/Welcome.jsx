import {
  Box,
  Button,
  ChoiceList,
  Grid,
  Layout,
  LegacyCard,
  LegacyStack,
  Page,
  Text,
  VideoThumbnail,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

const Welcome = () => {
  const [selectedChoice, setSelectedChoice] = useState("");

  const handleChoiceChange = useCallback((value) => {
    setSelectedChoice(value);
  }, []);

  console.log({ selectedChoice });

  return (
    <LegacyCard sectioned>
      <Page fullWidth>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 4, xl: 4 }}>
            <LegacyStack>
              <Text variant="headingLg">
                Connect Your Growlytics Account With Shopify
              </Text>
              <Text as="p">
                Hey! Thanks for installing Growlytics Connector App. With this,
                you can connect your Shopify store with your Growlytics account.
                When connected, this app will sync your Shopify customers,
                orders, data, products, shipment activities, discount coupons,
                and much more.
              </Text>

              <Text variant="headingLg">How to setup the connector app?</Text>

              <Text as="p">
                Setting up the connector app is very easy. You'll need to put
                the API key of your Growlytics account and press the button.
                That's it. You can watch this video on the right for additional
                help.
              </Text>

              <div style={{ marginTop: 20 }}>
                <Box>
                  <ChoiceList
                    choices={[
                      {
                        label: "Install Growlytics Connector App",
                        value: "step1",
                      },
                      {
                        label: "Connect Your Growlytics Account",
                        value: "step2",
                      },
                      {
                        label: "Verify & Start Sync",
                        value: "step3",
                      },
                    ]}
                    selected={selectedChoice}
                    onChange={handleChoiceChange}
                  />
                  <div style={{ marginTop: 50 }}>
                    <Button primary>Connect Growlytics Account</Button>
                  </div>
                </Box>
              </div>
            </LegacyStack>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 8, xl: 8 }}>
            <VideoThumbnail
              videoLength={80}
              thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
              onClick={() => console.log("clicked")}
            />
          </Grid.Cell>
        </Grid>
      </Page>
    </LegacyCard>
  );
};

export default Welcome;
