'use server'

import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:your@email.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

import type { PushSubscription as WebPushSubscription } from 'web-push'

let subscription: WebPushSubscription | null = null

export async function subscribeUser(sub: WebPushSubscription) {
  subscription = sub
  return { success: true }
}

export async function unsubscribeUser() {
  subscription = null
  return { success: true }
}

export async function sendNotification(message: string) {
  if (!subscription) throw new Error('No subscription')
  await webpush.sendNotification(subscription, JSON.stringify({
    title: 'Test Notification',
    body: message,
    icon: '/icon.png'
  }))
}
