import {
  Box,
  Button,
  LegacyCard,
  List,
  Text,
  TextField,
  Grid,
  VideoThumbnail,
  Page,
  Link,
} from "@shopify/polaris";
import React from "react";

const Connect = () => {
  return (
    <Box>
      <LegacyCard sectioned>
        <Text variant="headingLg">Connect Your Growlytics Account</Text>

        <div style={{ marginTop: 10 }}>
          <Text as="p">
            Enter your Growlytics api key and click on connect button to
            continue
          </Text>
        </div>

        <div style={{ marginTop: 30 }}>
          <TextField
            label={<Text variant="headingSm">Growlytics Api Key</Text>}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <Button primary>Connect</Button>
        </div>
      </LegacyCard>
      <LegacyCard sectioned>
        <Page fullWidth>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, md: 3, lg: 4, xl: 4 }}>
              <Text variant="headingLg">How to collect api key ?</Text>
              <div style={{ marginTop: 10 }}>
                <List type="bullet">
                  <List.Item>
                    To collect Growlytics api key, login to your Growlytics
                    account at{" "}
                    <Link url="https://app.growlytics.in/login">
                      https://app.growlytics.in/login
                    </Link>
                  </List.Item>
                  <List.Item>
                    Click on setting from side menu, And click on "Api keys"
                    section. You will be redirected to api keys page.
                  </List.Item>
                  <List.Item>
                    On api keys page, you will see your growlytics account's api
                    key, copy it and paste in above section and hit connect
                    button to continue.
                  </List.Item>
                </List>
              </div>
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
    </Box>
  );
};

export default Connect;
