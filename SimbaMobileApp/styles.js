import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  navy: '#0a1628',
  navy2: '#0f2040',
  navy3: '#162a50',
  gold: '#c9a84c',
  gold2: '#e8c96b',
  gold3: '#f5e0a0',
  white: '#ffffff',
  offwhite: '#f7f4ee',
  text: '#d0c8b8',
  muted: '#8a8070',
  accent: '#e8c96b',
  border: 'rgba(201, 168, 76, 0.15)',
  borderActive: 'rgba(201, 168, 76, 0.3)',
  cardBg: 'rgba(255, 255, 255, 0.03)',
  modalBg: 'rgba(10, 22, 40, 0.95)',
};

export const GLOBAL_STYLES = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  sectionTitle: {
    fontFamily: 'System', // Playfair Display would be loaded via Font.loadAsync
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    paddingHorizontal: 10,
  },
  tag: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  btnGold: {
    backgroundColor: COLORS.gold,
  },
  btnGoldText: {
    color: COLORS.navy,
    fontSize: 15,
    fontWeight: '600',
  },
  btnOutline: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  btnOutlineText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
