import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { closeDrawer } from "@/store/cartUiSlice";
import Cart from "@/components/pages/cart";
import { colors } from "@/lib/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.9, 420);
const ANIMATION_DURATION = 220;

export default function CartSidebar() {
  const dispatch = useDispatch();
  const drawerOpen = useSelector((s: RootState) => s.cartUi.drawerOpen);
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const translateX = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (drawerOpen) {
      setVisible(true);
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
    } else if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: DRAWER_WIDTH,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          easing: Easing.in(Easing.quad),
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setVisible(false);
        }
      });
    }
  }, [drawerOpen, visible, overlayOpacity, translateX]);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.root} accessible accessibilityViewIsModal>
        <Animated.View
          style={[styles.overlay, { opacity: overlayOpacity }]}
          pointerEvents="auto"
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Close cart"
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX }],
            },
          ]}
          accessibilityLabel="Your cart"
        >
          <View
            style={[
              styles.content,
              {
                paddingTop: insets.top,
                paddingBottom: Math.max(insets.bottom, 16),
              },
            ]}
          >
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Cart</Text>
              <Pressable
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel="Close cart"
                hitSlop={10}
                style={styles.closeButton}
              >
                <Text style={styles.closeIcon}>×</Text>
              </Pressable>
            </View>
            <Cart />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  drawer: {
    marginLeft: "auto",
    width: DRAWER_WIDTH,
    maxWidth: "100%",
    flex: 1,
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 24,
    color: colors.stone[400],
  },
});
