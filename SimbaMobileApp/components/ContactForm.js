import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { COLORS, GLOBAL_STYLES } from '../styles';

export default function ContactForm({ initialMessage, initialRole }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Distributor / Wholesaler');
  const [message, setMessage] = useState('');

  const roles = [
    'Distributor / Wholesaler',
    'Retailer / Shop Owner',
    'Corporate Buyer',
    'General Consumer'
  ];

  // Update when values are passed from parent (e.g. from Pricing Calculator or Modal actions)
  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialMessage, initialRole]);

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Incomplete Form', 'Please fill in Name, Email, and Message fields.');
      return;
    }
    
    // Mimic success submission
    Alert.alert(
      'Enquiry Sent ✦',
      `Thank you, ${name}! Your enquiry has been registered. The Simba Beverages B2B team will contact you at ${email} within 24 hours.`,
      [{ text: 'OK', onPress: handleClear }]
    );
  };

  const handleClear = () => {
    setName('');
    setEmail('');
    setCompany('');
    setRole('Distributor / Wholesaler');
    setMessage('');
  };

  return (
    <View style={styles.contactSection}>
      <View style={GLOBAL_STYLES.container}>
        <View style={GLOBAL_STYLES.tag}>
          <Text style={GLOBAL_STYLES.tagText}>Contact</Text>
        </View>
        <Text style={GLOBAL_STYLES.sectionTitle}>Get In Touch</Text>
        <Text style={GLOBAL_STYLES.sectionSubtitle}>
          Register as an official distributor, request wholesale catalogs, or partner with us.
        </Text>

        <View style={styles.formCard}>
          {/* Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Mwansa Mwape"
              placeholderTextColor={COLORS.muted}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. mwansa@example.com"
              placeholderTextColor={COLORS.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Company */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Company / Shop Name</Text>
            <TextInput
              style={styles.input}
              value={company}
              onChangeText={setCompany}
              placeholder="e.g. Mwansa Retail Ltd (Optional)"
              placeholderTextColor={COLORS.muted}
            />
          </View>

          {/* Role selector tabs */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Role</Text>
            <View style={styles.roleGrid}>
              {roles.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.roleTab,
                    role === r && styles.roleTabActive
                  ]}
                  onPress={() => setRole(r)}
                >
                  <Text 
                    style={[
                      styles.roleTabText,
                      role === r && styles.roleTabActiveText
                    ]}
                  >
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Message */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Enquiry / Message</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={message}
              onChangeText={setMessage}
              placeholder="Tell us about your logistics requirements, target product lines, and estimated order frequencies..."
              placeholderTextColor={COLORS.muted}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>

          {/* Submit */}
          <TouchableOpacity 
            style={[GLOBAL_STYLES.btn, GLOBAL_STYLES.btnGold, styles.submitBtn]}
            onPress={handleSubmit}
          >
            <Text style={GLOBAL_STYLES.btnGoldText}>Send B2B Request ✦</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contactSection: {
    backgroundColor: COLORS.navy2,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gold2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(201, 168, 76, 0.15)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.white,
    fontSize: 14,
  },
  textarea: {
    minHeight: 100,
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  roleTabActive: {
    borderColor: COLORS.gold,
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
  },
  roleTabText: {
    fontSize: 11,
    color: COLORS.text,
  },
  roleTabActiveText: {
    color: COLORS.gold,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 10,
  },
});
