import React from "react";
import { View, Text } from "react-native";
import { IconLI, IconOT, IconSC } from "@/components/icons";
import { homeFeaturesStyles as styles } from "@/styles/Home.styles";

const features = [
  {
    icon: <IconLI />,
    title: "Live inventory",
    description:
      "Stock levels update instantly. No stale carts or surprise sold-outs.",
  },
  {
    icon: <IconOT />,
    title: "Order tracking",
    description:
      "Follow your order from payment to delivery with live status updates.",
  },
  {
    icon: <IconSC />,
    title: "Secure checkout",
    description:
      "Pay with confidence. Your data is protected every step of the way.",
  },
];

const Features: React.FC = () => (
  <View style={styles.section}>
    <View style={styles.inner}>
      <Text style={styles.heading}>Why Realtime</Text>
      <View style={styles.grid}>
        {features.map((item) => (
          <View key={item.title} style={styles.card}>
            <View style={styles.iconWrap}>{item.icon}</View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        ))}
      </View>
    </View>
  </View>
);

export default Features;
