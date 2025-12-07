<template>
    <div class="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col relative overflow-hidden">

    <!-- Header -->
    <div class="relative z-10 px-6 py-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur">
      <div class="max-w-4xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtLink 
            to="/" 
            class="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
          <div class="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h1 class="font-semibold text-white">Customer Support</h1>
            <p class="text-xs text-slate-400">We typically reply within minutes</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span class="text-sm text-slate-400">Online</span>
        </div>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden ">
      <!-- Name Input (if no chat started) -->
      <div v-if="!chatId" class="flex-1 flex items-center justify-center p-6">
        <div class="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 w-full max-w-md text-center">
          <div class="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-white mb-2">Start a conversation</h2>
          <p class="text-slate-400 text-sm mb-6">Enter your name to begin chatting with our support team</p>
          
          <form @submit.prevent="startChat" class="space-y-4">
            <input
              v-model="customerName"
              type="text"
              required
              placeholder="Your name"
              class="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <button
              type="submit"
              :disabled="!customerName.trim() || startingChat"
              class="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              {{ startingChat ? 'Starting...' : 'Start Chat' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Messages Area -->
      <template v-else>
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- Welcome message -->
          <div class="flex justify-start">
            <div class="max-w-md px-4 py-3 rounded-2xl bg-slate-700 text-white rounded-bl-sm">
              <p>Hello {{ customerName }}! 👋 How can we help you today?</p>
              <p class="text-xs mt-1 text-slate-400">Support Team</p>
            </div>
          </div>

          <!-- Messages -->
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'customer' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-md px-4 py-3 rounded-2xl',
                message.sender === 'customer'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-slate-700 text-white rounded-bl-sm'
              ]"
            >
              <!-- File attachment -->
              <div v-if="message.fileUrl" class="mb-2">
                <a
                  :href="message.fileUrl"
                  target="_blank"
                  class="flex items-center gap-2 text-sm underline opacity-90 hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                  </svg>
                  {{ message.fileName || 'Attachment' }}
                </a>
              </div>
              <p>{{ message.text }}</p>
              <p
                :class="[
                  'text-xs mt-1',
                  message.sender === 'customer' ? 'text-blue-200' : 'text-slate-400'
                ]"
              >
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Message Input -->
<!-- Message Input -->
        <div class="sticky bottom-0 p-4 border-t border-slate-700 bg-slate-800/70 backdrop-blur-lg">
          <!-- File preview -->
          <div v-if="selectedFile" class="mb-3 flex items-center gap-3 px-4 py-2 bg-slate-700/50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
            </svg>
            <span class="flex-1 text-sm text-white truncate">{{ selectedFile.name }}</span>
            <button @click="selectedFile = null" class="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex gap-3 items-center">
            <!-- Hidden file input -->
            <input
              ref="fileInput"
              type="file"
              class="hidden"
              @change="handleFileSelect"
            />
            
            <!-- File upload button -->
            <button
              type="button"
              @click="fileInput.click()"
              class="p-3 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-colors flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
              </svg>
            </button>

            <!-- Message input -->
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
              class="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            
            <!-- Send button -->
            <button
              @click="sendMessage"
              :disabled="(!newMessage.trim() && !selectedFile) || sending"
              class="p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const { db, storage } = useFirebase()

// State
const customerName = ref('')
const chatId = ref(null)
const messages = ref([])
const newMessage = ref('')
const selectedFile = ref(null)
const sending = ref(false)
const startingChat = ref(false)
const messagesContainer = ref(null)
const fileInput = ref(null)

// Start a new chat
const startChat = async () => {
  if (!customerName.value.trim()) return
  
  startingChat.value = true
  
  try {
    const chatDoc = await addDoc(collection(db, 'chats'), {
      customerName: customerName.value,
      status: 'active',
      createdAt: serverTimestamp(),
      lastMessageAt: serverTimestamp(),
      lastMessage: ''
    })
    
    chatId.value = chatDoc.id
    loadMessages()
  } catch (e) {
    console.error('Error starting chat:', e)
  } finally {
    startingChat.value = false
  }
}

// Load messages for current chat
const loadMessages = () => {
  if (!chatId.value) return
  
  const messagesQuery = query(
    collection(db, 'chats', chatId.value, 'messages'),
    orderBy('timestamp', 'asc')
  )
  
  onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    })
  })
}

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

// Send message
const sendMessage = async () => {
  if ((!newMessage.value.trim() && !selectedFile.value) || !chatId.value) return
  
  sending.value = true
  const messageText = newMessage.value
  const file = selectedFile.value
  
  newMessage.value = ''
  selectedFile.value = null
  
  try {
    let fileUrl = null
    let fileName = null
    
    // Upload file if selected
    if (file) {
      const fileRef = storageRef(storage, `chats/${chatId.value}/${Date.now()}_${file.name}`)
      await uploadBytes(fileRef, file)
      fileUrl = await getDownloadURL(fileRef)
      fileName = file.name
    }
    
    // Add message
    await addDoc(collection(db, 'chats', chatId.value, 'messages'), {
      text: messageText || (fileName ? `Sent a file: ${fileName}` : ''),
      sender: 'customer',
      timestamp: serverTimestamp(),
      fileUrl,
      fileName
    })
    
    // Update chat's last message
    await updateDoc(doc(db, 'chats', chatId.value), {
      lastMessage: messageText || `📎 ${fileName}`,
      lastMessageAt: serverTimestamp()
    })
  } catch (e) {
    console.error('Error sending message:', e)
  } finally {
    sending.value = false
  }
}

// Helpers
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>