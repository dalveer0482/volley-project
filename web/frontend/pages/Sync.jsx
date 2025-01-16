import {
  Badge,
  Button,
  Icon,
  LegacyCard,
  LegacyStack,
  Text,
} from "@shopify/polaris";
import { RefreshMajor } from "@shopify/polaris-icons";
import React, { useState } from "react";

const Sync = () => {
  const [isLoading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const handleSync = async () => {
    try {
      setLoading(true);
      const productData = await fetch("/api/products").then((res) =>
        res.json()
      );
      const orderData = await fetch("/api/orders").then((res) => res.json());

      setTotalProducts(productData?.count || 0);
      setTotalOrders(orderData?.count || 0);

      setLoading(false);
      console.log({ productData, orderData });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <LegacyCard
      title={
        <div style={{ textAlign: "center" }}>
          <Text variant="headingLg">Start Syncing Your Store</Text>
        </div>
      }
      sectioned
    >
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <LegacyStack>
          <Badge>Growlytics-dev.myshopify.com</Badge>
          <Icon source={RefreshMajor} tone="base" />
          <Badge>Demo-Shopify Connector App</Badge>
        </LegacyStack>
      </div>
      <div style={{ marginTop: 50, display: "flex", justifyContent: "center" }}>
        <Button primary onClick={handleSync} disabled={isLoading}>
          {isLoading ? "Syncing...." : "Start Sync"}
        </Button>
      </div>

      <LegacyStack>
        <Text variant="headingSm">Products:</Text>
        <Text variant="headingSm">{totalProducts}</Text>
      </LegacyStack>
      <LegacyStack>
        <Text variant="headingSm">Orders:</Text>
        <Text variant="headingSm">{totalOrders}</Text>
      </LegacyStack>
    </LegacyCard>
  );
};

export default Sync;
