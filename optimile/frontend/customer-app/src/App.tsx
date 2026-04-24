import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type ShipmentStatus =
  | 'DRAFT'
  | 'PENDING_RATE_APPROVAL'
  | 'PENDING_ASSIGNMENT'
  | 'IN_TRANSIT'
  | 'DELAYED'
  | 'DELIVERED'
  | 'INVOICED'
  | 'DISPUTED'
  | 'PAID';

type Shipment = {
  id: string;
  customer: string;
  source: string;
  destination: string;
  material: string;
  qty: string;
  vehicleType: string;
  lane: string;
  rateType: 'Contract' | 'Spot';
  status: ShipmentStatus;
  eta: string;
  lrType: 'Auto' | 'Manual' | 'Pre-generated';
  lastUpdate: string;
  pod: 'Pending' | 'Driver Submitted' | 'Consignee E-Sign Complete';
  invoice: 'Not Raised' | 'Draft Generated' | 'Sent' | 'Paid' | 'Disputed';
};

const Tab = createBottomTabNavigator();

const shipments: Shipment[] = [
  {
    id: 'BK-24061',
    customer: 'Aster Retail Ltd',
    source: 'Bhiwandi Hub',
    destination: 'Bengaluru DC 02',
    material: 'Packaged FMCG',
    qty: '12 MT',
    vehicleType: '32FT MXL',
    lane: 'Mumbai → Bengaluru',
    rateType: 'Contract',
    status: 'IN_TRANSIT',
    eta: 'Today, 18:30',
    lrType: 'Pre-generated',
    lastUpdate: 'In-transit checkpoint crossed at Pune.',
    pod: 'Pending',
    invoice: 'Not Raised',
  },
  {
    id: 'BK-24058',
    customer: 'Aster Retail Ltd',
    source: 'Pune Factory 1',
    destination: 'Hyderabad RDC',
    material: 'Home care products',
    qty: '9 MT',
    vehicleType: '20FT',
    lane: 'Pune → Hyderabad',
    rateType: 'Contract',
    status: 'DELAYED',
    eta: 'Tomorrow, 08:00',
    lrType: 'Auto',
    lastUpdate: 'ETA breached by 2h+. Exception raised and supervisor assigned.',
    pod: 'Pending',
    invoice: 'Not Raised',
  },
  {
    id: 'BK-24044',
    customer: 'Aster Retail Ltd',
    source: 'Nagpur Branch',
    destination: 'Kolkata Hub',
    material: 'Paper goods',
    qty: '16 MT',
    vehicleType: '40FT Trailer',
    lane: 'Nagpur → Kolkata',
    rateType: 'Spot',
    status: 'DISPUTED',
    eta: 'Delivered',
    lrType: 'Manual',
    lastUpdate: 'Invoice dispute raised for short delivery and detention charge.',
    pod: 'Consignee E-Sign Complete',
    invoice: 'Disputed',
  },
  {
    id: 'BK-24021',
    customer: 'Aster Retail Ltd',
    source: 'Ahmedabad Plant',
    destination: 'Jaipur DC 01',
    material: 'Industrial chemicals',
    qty: '8 MT',
    vehicleType: '32FT',
    lane: 'Ahmedabad → Jaipur',
    rateType: 'Contract',
    status: 'PAID',
    eta: 'Completed',
    lrType: 'Auto',
    lastUpdate: 'Payment reconciled by Finance on Apr 22, 2026.',
    pod: 'Consignee E-Sign Complete',
    invoice: 'Paid',
  },
];

const statusColors: Record<ShipmentStatus, string> = {
  DRAFT: '#64748b',
  PENDING_RATE_APPROVAL: '#f59e0b',
  PENDING_ASSIGNMENT: '#0284c7',
  IN_TRANSIT: '#3b82f6',
  DELAYED: '#dc2626',
  DELIVERED: '#16a34a',
  INVOICED: '#8b5cf6',
  DISPUTED: '#ea580c',
  PAID: '#0f766e',
};

function SectionCard({ title, subtitle, children }: React.PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function StatusChip({ status }: { status: ShipmentStatus }) {
  return (
    <View style={[styles.chip, { backgroundColor: `${statusColors[status]}22` }]}> 
      <Text style={[styles.chipText, { color: statusColors[status] }]}>{status.replace(/_/g, ' ')}</Text>
    </View>
  );
}

function HomeScreen() {
  const inTransit = shipments.filter((s) => s.status === 'IN_TRANSIT' || s.status === 'DELAYED').length;
  const invoicedOrPaid = shipments.filter((s) => s.status === 'INVOICED' || s.status === 'PAID').length;
  const exceptions = shipments.filter((s) => s.status === 'DELAYED' || s.status === 'DISPUTED').length;

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContainer}>
      <Text style={styles.pageTitle}>Customer Home</Text>
      <Text style={styles.pageSubtitle}>Shipment visibility, ETA alerts, invoice lifecycle and POD compliance.</Text>

      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>{shipments.length}</Text>
          <Text style={styles.kpiLabel}>Total Shipments</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>{inTransit}</Text>
          <Text style={styles.kpiLabel}>In Transit / Delayed</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>{exceptions}</Text>
          <Text style={styles.kpiLabel}>Exceptions</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiValue}>{invoicedOrPaid}</Text>
          <Text style={styles.kpiLabel}>Invoiced / Paid</Text>
        </View>
      </View>

      <SectionCard title="Action Center" subtitle="Priority items from booking + trip lifecycle">
        <Text style={styles.listItem}>• 1 booking in DELAYED state with ETA breach &gt; 2 hours.</Text>
        <Text style={styles.listItem}>• 1 invoice in DISPUTED; finance remark and POD evidence available.</Text>
        <Text style={styles.listItem}>• 2 consignments pending POD closure by consignee e-sign/OTP.</Text>
      </SectionCard>

      <SectionCard title="Track & Trace Snapshot" subtitle="Lane-based visibility from source to delivery">
        {shipments.slice(0, 2).map((shipment) => (
          <View key={shipment.id} style={styles.rowItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{shipment.id}</Text>
              <Text style={styles.rowMeta}>{shipment.lane}</Text>
              <Text style={styles.rowMeta}>ETA: {shipment.eta}</Text>
            </View>
            <StatusChip status={shipment.status} />
          </View>
        ))}
      </SectionCard>
    </ScrollView>
  );
}

function QuickBookScreen() {
  const [form, setForm] = useState({
    customer: 'Aster Retail Ltd',
    material: '',
    source: '',
    destination: '',
    qty: '',
    rateType: 'Contract',
    rate: '',
    remark: '',
  });

  const validation = useMemo(() => {
    const errors: string[] = [];
    if (!form.material.trim()) errors.push('Material is required (customer-mapped only).');
    if (!form.source.trim()) errors.push('Source must be selected from lane-mapped address book.');
    if (!form.destination.trim()) errors.push('Destination must be selected from lane-mapped address book.');
    if (!form.qty.trim()) errors.push('Shipment quantity is required.');
    if (form.rateType === 'Spot' && !form.rate.trim()) errors.push('Spot rate is required when no contracted lane rate is available.');
    if (form.rateType === 'Spot' && Number(form.rate) > 65000 && !form.remark.trim()) {
      errors.push('Deviation remark is mandatory for high spot rates routed to approval.');
    }
    return errors;
  }, [form]);

  const setField = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContainer}>
      <Text style={styles.pageTitle}>Quick Book</Text>
      <Text style={styles.pageSubtitle}>Progressive booking form with lane filtering, rate mode and deviation controls.</Text>

      <SectionCard title="Booking Form" subtitle="Aligned with BRD booking flow dependencies">
        <Text style={styles.label}>Customer</Text>
        <TextInput style={styles.input} value={form.customer} editable={false} />

        <Text style={styles.label}>Material</Text>
        <TextInput style={styles.input} value={form.material} onChangeText={(v: string) => setField('material', v)} placeholder="e.g., Packaged FMCG" />

        <Text style={styles.label}>Source Address</Text>
        <TextInput style={styles.input} value={form.source} onChangeText={(v: string) => setField('source', v)} placeholder="Pick from customer lane-mapped source" />

        <Text style={styles.label}>Destination Address</Text>
        <TextInput style={styles.input} value={form.destination} onChangeText={(v: string) => setField('destination', v)} placeholder="Pick from customer lane-mapped destination" />

        <Text style={styles.label}>Quantity</Text>
        <TextInput style={styles.input} value={form.qty} onChangeText={(v: string) => setField('qty', v)} placeholder="e.g., 12 MT" />

        <Text style={styles.label}>Rate Type (Contract / Spot)</Text>
        <View style={styles.segmentRow}>
          {(['Contract', 'Spot'] as const).map((mode) => (
            <Pressable
              key={mode}
              style={[styles.segmentBtn, form.rateType === mode && styles.segmentBtnActive]}
              onPress={() => setField('rateType', mode)}
            >
              <Text style={[styles.segmentText, form.rateType === mode && styles.segmentTextActive]}>{mode}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Freight Rate</Text>
        <TextInput style={styles.input} value={form.rate} onChangeText={(v: string) => setField('rate', v)} keyboardType="numeric" placeholder="Required for Spot rate" />

        <Text style={styles.label}>Ops / Deviation Remark</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          multiline
          value={form.remark}
          onChangeText={(v: string) => setField('remark', v)}
          placeholder="Mandatory when routing to approval"
        />
      </SectionCard>

      <SectionCard title="Validation & Submission" subtitle="Booking can proceed only when required fields are valid">
        {validation.length ? (
          validation.map((error) => (
            <Text key={error} style={styles.errorText}>• {error}</Text>
          ))
        ) : (
          <Text style={styles.successText}>All required checks passed. Booking is ready for submission.</Text>
        )}

        <View style={styles.actionRow}>
          <Pressable style={[styles.actionBtn, styles.secondaryBtn]}>
            <Text style={styles.secondaryBtnText}>Save Draft</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, validation.length ? styles.disabledBtn : styles.primaryBtn]}>
            <Text style={styles.primaryBtnText}>Submit Booking</Text>
          </Pressable>
        </View>
      </SectionCard>
    </ScrollView>
  );
}

function ShipmentsListScreen() {
  const [filter, setFilter] = useState<'ALL' | ShipmentStatus>('ALL');
  const visible = filter === 'ALL' ? shipments : shipments.filter((item) => item.status === filter);

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContainer}>
      <Text style={styles.pageTitle}>Shipments List</Text>
      <Text style={styles.pageSubtitle}>Status-aware list with ETA context, POD stage and invoice state.</Text>

      <SectionCard title="Filters" subtitle="Track by lifecycle status">
        <View style={styles.filterWrap}>
          {(['ALL', 'IN_TRANSIT', 'DELAYED', 'DISPUTED', 'PAID'] as const).map((item) => (
            <Pressable
              key={item}
              style={[styles.filterChip, filter === item && styles.filterChipActive]}
              onPress={() => setFilter(item)}
            >
              <Text style={[styles.filterChipText, filter === item && styles.filterChipTextActive]}>{item.replace(/_/g, ' ')}</Text>
            </Pressable>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Active Shipments" subtitle={`${visible.length} record(s) shown`}>
        {visible.map((shipment) => (
          <View key={shipment.id} style={styles.shipmentCard}>
            <View style={styles.shipmentHead}>
              <Text style={styles.shipmentId}>{shipment.id}</Text>
              <StatusChip status={shipment.status} />
            </View>
            <Text style={styles.rowMeta}>{shipment.source} → {shipment.destination}</Text>
            <Text style={styles.rowMeta}>Material: {shipment.material} | Qty: {shipment.qty}</Text>
            <Text style={styles.rowMeta}>POD: {shipment.pod} | Invoice: {shipment.invoice}</Text>
            <Text style={styles.rowUpdate}>{shipment.lastUpdate}</Text>
          </View>
        ))}
      </SectionCard>
    </ScrollView>
  );
}

function ShipmentDetailScreen() {
  const shipment = shipments[0];
  const timeline = [
    'DRAFT created by customer user',
    'PENDING_ASSIGNMENT after ops validation',
    'Vehicle assigned and LR generated',
    'IN_TRANSIT with GPS checkpoints',
    'Awaiting POD capture and consignee e-signature',
    'Invoice generation after DELIVERED + POD',
  ];

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContainer}>
      <Text style={styles.pageTitle}>Shipment Detail</Text>
      <Text style={styles.pageSubtitle}>Lifecycle, document checkpoints, remarks and financial closure.</Text>

      <SectionCard title={`${shipment.id} · ${shipment.customer}`} subtitle={`${shipment.source} → ${shipment.destination}`}>
        <View style={styles.detailGrid}>
          <Text style={styles.detailItem}>Lane: {shipment.lane}</Text>
          <Text style={styles.detailItem}>Rate Type: {shipment.rateType}</Text>
          <Text style={styles.detailItem}>LR Type: {shipment.lrType}</Text>
          <Text style={styles.detailItem}>ETA: {shipment.eta}</Text>
          <Text style={styles.detailItem}>Material: {shipment.material}</Text>
          <Text style={styles.detailItem}>Vehicle Type: {shipment.vehicleType}</Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <StatusChip status={shipment.status} />
        </View>
      </SectionCard>

      <SectionCard title="Timeline" subtitle="End-to-end state progression">
        {timeline.map((step) => (
          <Text key={step} style={styles.listItem}>• {step}</Text>
        ))}
      </SectionCard>

      <SectionCard title="POD, Invoice & Dispute" subtitle="Customer-facing post-delivery controls">
        <Text style={styles.listItem}>• Driver POD capture: photo + recipient name (submitted).</Text>
        <Text style={styles.listItem}>• Consignee confirmation: secure link with e-sign / OTP.</Text>
        <Text style={styles.listItem}>• Invoice draft auto-generated only after DELIVERED + POD.</Text>
        <Text style={styles.listItem}>• Dispute workflow available with structured finance remark timeline.</Text>
      </SectionCard>

      <SectionCard title="Remarks Timeline" subtitle="Immutable audit narrative across actors">
        <Text style={styles.rowMeta}>Ops Remark — 2026-04-23 10:05: Route clear, vehicle departed from origin.</Text>
        <Text style={styles.rowMeta}>Driver Remark — 2026-04-23 15:14: Halted for mandated weighbridge check.</Text>
        <Text style={styles.rowMeta}>Customer Remark — 2026-04-24 08:20: Please notify consignee 1 hour prior arrival.</Text>
      </SectionCard>
    </ScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerTitleAlign: 'left', tabBarActiveTintColor: '#2563eb', tabBarLabelStyle: { fontSize: 12 } }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Quick Book" component={QuickBookScreen} />
        <Tab.Screen name="Shipments List" component={ShipmentsListScreen} />
        <Tab.Screen name="Shipment Detail" component={ShipmentDetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#e2e8f0' },
  pageContainer: { padding: 16, gap: 12, paddingBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: '700', color: '#0f172a' },
  pageSubtitle: { color: '#334155', marginBottom: 4 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 1,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  cardSubtitle: { color: '#64748b', marginTop: 2 },
  cardBody: { marginTop: 10, gap: 8 },
  kpiRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  kpiCard: {
    width: '48.7%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dbeafe',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  kpiValue: { fontSize: 22, fontWeight: '700', color: '#1d4ed8' },
  kpiLabel: { color: '#475569', marginTop: 2, fontSize: 12 },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, paddingVertical: 6 },
  rowTitle: { fontWeight: '700', color: '#0f172a' },
  rowMeta: { color: '#475569' },
  rowUpdate: { color: '#0f172a', marginTop: 6, fontStyle: 'italic' },
  chip: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  chipText: { fontWeight: '700', fontSize: 11 },
  listItem: { color: '#1e293b', lineHeight: 20 },
  label: { color: '#0f172a', fontWeight: '600', marginTop: 4 },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  multilineInput: { minHeight: 84, textAlignVertical: 'top' },
  segmentRow: { flexDirection: 'row', gap: 8 },
  segmentBtn: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#93c5fd',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#eff6ff',
  },
  segmentBtnActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  segmentText: { color: '#1d4ed8', fontWeight: '600' },
  segmentTextActive: { color: '#fff' },
  errorText: { color: '#b91c1c' },
  successText: { color: '#166534', fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  actionBtn: { flex: 1, borderRadius: 10, paddingVertical: 11, alignItems: 'center' },
  secondaryBtn: { backgroundColor: '#e2e8f0' },
  secondaryBtnText: { color: '#0f172a', fontWeight: '700' },
  primaryBtn: { backgroundColor: '#16a34a' },
  primaryBtnText: { color: '#fff', fontWeight: '700' },
  disabledBtn: { backgroundColor: '#94a3b8' },
  filterWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#f8fafc',
  },
  filterChipActive: { borderColor: '#1d4ed8', backgroundColor: '#dbeafe' },
  filterChipText: { color: '#334155', fontSize: 12, fontWeight: '600' },
  filterChipTextActive: { color: '#1d4ed8' },
  shipmentCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    padding: 10,
    gap: 4,
  },
  shipmentHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  shipmentId: { fontWeight: '700', color: '#0f172a', fontSize: 15 },
  detailGrid: { gap: 6 },
  detailItem: { color: '#1e293b' },
});
