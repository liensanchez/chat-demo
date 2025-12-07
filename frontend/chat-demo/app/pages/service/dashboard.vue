<template>
<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex relative">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
    </div>
    <!-- Sidebar - Chat List -->
    <div class="relative z-10 w-80 bg-slate-800/70 backdrop-blur border-r border-slate-700 flex flex-col">
      <!-- Header -->
      <div class="p-4 border-b border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-xl font-bold text-white">Chats</h1>
          <button
            @click="handleLogout"
            class="text-slate-400 hover:text-white transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </div>
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search chats..."
            class="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      <!-- Chat List -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="loadingChats" class="p-4 text-center text-slate-400">
          Loading chats...
        </div>

        <div v-else-if="filteredChats.length === 0" class="p-4 text-center text-slate-400">
          <p>No chats yet</p>
          <p class="text-sm mt-1">Waiting for customers...</p>
        </div>

        <div
          v-for="chat in filteredChats"
          :key="chat.id"
          @click="selectChat(chat)"
          :class="[
            'p-4 border-b border-slate-700 cursor-pointer transition-colors',
            selectedChat?.id === chat.id ? 'bg-slate-700' : 'hover:bg-slate-700/50'
          ]"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <span class="text-blue-400 font-medium">{{ getInitials(chat.customerName) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-white truncate">{{ chat.customerName }}</span>
                <span class="text-xs text-slate-500">{{ formatTime(chat.lastMessageAt) }}</span>
              </div>
              <p class="text-sm text-slate-400 truncate">{{ chat.lastMessage || 'No messages yet' }}</p>
            </div>
            <div
              v-if="chat.unread"
              class="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="relative z-10 flex-1 flex flex-col">
      <div v-if="!selectedChat" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h2 class="text-xl font-medium text-white mb-2">Select a conversation</h2>
          <p class="text-slate-400">Choose a chat from the sidebar to start responding</p>
        </div>
      </div>

      <template v-else>
        <!-- Chat header -->
        <div class="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span class="text-blue-400 font-medium">{{ getInitials(selectedChat.customerName) }}</span>
            </div>
            <div>
              <h2 class="font-medium text-white">{{ selectedChat.customerName }}</h2>
              <p class="text-sm text-slate-400">{{ selectedChat.status === 'active' ? 'Online' : 'Offline' }}</p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex',
              message.sender === 'service' ? 'justify-end' : 'justify-start'
            ]"
          >
            <div
              :class="[
                'max-w-md px-4 py-3 rounded-2xl',
                message.sender === 'service'
                  ? 'bg-emerald-600 text-white rounded-br-sm'
                  : 'bg-slate-700 text-white rounded-bl-sm'
              ]"
            >
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
                  message.sender === 'service' ? 'text-emerald-200' : 'text-slate-400'
                ]"
              >
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Message input -->
        <div class="p-4 border-t border-slate-700 bg-slate-800/50">
          <form @submit.prevent="sendMessage" class="flex gap-3">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Type a message..."
              class="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              :disabled="!newMessage.trim()"
              class="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { signOut } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore'

const { auth, db } = useFirebase()
const router = useRouter()

const chats = ref([])
const selectedChat = ref(null)
const messages = ref([])
const newMessage = ref('')
const searchQuery = ref('')
const loadingChats = ref(true)
const messagesContainer = ref(null)

const filteredChats = computed(() => {
  if (!searchQuery.value) return chats.value
  const search = searchQuery.value.toLowerCase()
  return chats.value.filter(chat => 
    chat.customerName.toLowerCase().includes(search)
  )
})

const loadChats = () => {
  const chatsQuery = query(collection(db, 'chats'), orderBy('lastMessageAt', 'desc'))
  
  onSnapshot(chatsQuery, (snapshot) => {
    chats.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    loadingChats.value = false
  })
}

const selectChat = (chat) => {
  selectedChat.value = chat
  
  const messagesQuery = query(
    collection(db, 'chats', chat.id, 'messages'),
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

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedChat.value) return
  
  const messageText = newMessage.value
  newMessage.value = ''
  
  try {
    await addDoc(collection(db, 'chats', selectedChat.value.id, 'messages'), {
      text: messageText,
      sender: 'service',
      timestamp: serverTimestamp()
    })
    
    await updateDoc(doc(db, 'chats', selectedChat.value.id), {
      lastMessage: messageText,
      lastMessageAt: serverTimestamp()
    })
  } catch (e) {
    console.error('Error sending message:', e)
  }
}

const handleLogout = async () => {
  await signOut(auth)
  router.push('/')
}

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  loadChats()
})
</script>