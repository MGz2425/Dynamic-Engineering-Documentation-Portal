
import { TechnicalDoc, DocCategory } from './types';

export const SAMPLE_DOCS: TechnicalDoc[] = [
  {
    id: 'spec-001',
    title: 'High-Frequency Trading Protocol (HFTP-2)',
    category: DocCategory.PROTOCOL,
    content: `
# HFTP-2 Specification

The High-Frequency Trading Protocol v2 defines the message structure and state machine for ultra-low latency execution.

## Packet Structure
\`\`\`json
{
  "header": { "version": 2, "timestamp": 64bit_ns },
  "payload": { "type": "ORDER", "side": "BUY", "qty": 100 }
}
\`\`\`

## Compliance Requirements
1. Deterministic response time < 5μs.
2. Binary encoding (XDR) mandatory.
3. Keep-alive heartbeat every 100ms.
    `,
    tags: ['hft', 'latency', 'trading'],
    lastUpdated: '2024-10-25',
    author: 'Chief Architect',
    version: '2.4.1'
  },
  {
    id: 'test-402',
    title: 'Protocol Stress Testing Procedure',
    category: DocCategory.TESTING,
    content: `
# Stress Testing Guide

This document outlines the procedure for saturating 100G interfaces to validate buffer management.

## Setup
- Deploy 4x Spirent TestCenter nodes.
- Target: Core Switch Cluster B.

## Key Metrics
- Frame Loss Ratio (FLR)
- Jitter Variance
- Queue Depth Latency (QDL)

> **Warning**: Ensure failover clusters are isolated before initiating 100Gbps bursts.
    `,
    tags: ['stress-test', 'network', 'spirent'],
    lastUpdated: '2024-11-12',
    author: 'Sr. QA Engineer',
    version: '1.0.0'
  },
  {
    id: 'arch-99',
    title: 'Microservices Mesh Topology',
    category: DocCategory.ARCHITECTURE,
    content: `
# Mesh Topology v3

Implementation of mTLS and sidecar proxying across distributed edge nodes.

## Service Discovery
Using Consul as the primary KV store for endpoint registration.

## Routing Logic
L7 routing handled by customized Envoy instances.
    `,
    tags: ['kubernetes', 'mesh', 'envoy'],
    lastUpdated: '2024-12-01',
    author: 'Infrastructure Lead',
    version: '3.1.2'
  }
];

export const APP_THEME = {
  primary: '#3b82f6',
  background: '#09090b',
  surface: '#18181b',
  border: '#27272a',
  text: '#fafafa',
  textMuted: '#a1a1aa'
};
