import { useState, type ReactNode } from 'react'
import { useScrollAnimation } from '@hooks'
import { usePageTranslation } from '@hooks/usePageTranslation'
import { translations } from './skills.i18n'
import type { Skill } from '@models/home/skills/SkillsModel'
import {
  Box,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'

// ─── Syntax colors ─────────────────────────────────────────
const SC = {
  keyword: '#a855f7',  // const, import, function, return
  name:    '#60a5fa',  // 변수/함수명
  prop:    '#4ade80',  // 객체 프로퍼티
  string:  '#facc15',  // 문자열
  comment: '#64748b',  // 주석
  tag:     '#f472b6',  // JSX 태그
  type:    '#22d3ee',  // TS 타입
} as const

// ─── 언어별 코드 스니펫 ──────────────────────────────────────
const codeSnippets: Record<string, { file: string; code: ReactNode }> = {
  React: {
    file: 'Component.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>useState</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"react"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export default function</span>{' '}
        <span style={{ color: SC.name }}>Counter</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span> [
        <span style={{ color: SC.prop }}>count</span>,{' '}
        <span style={{ color: SC.prop }}>setCount</span>] ={' '}
        <span style={{ color: SC.name }}>useState</span>(
        <span style={{ color: SC.string }}>0</span>);{'\n\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;button</span>{' '}
        <span style={{ color: SC.prop }}>onClick</span>={'{'}() =&gt;{' '}
        <span style={{ color: SC.name }}>setCount</span>(c =&gt; c + 1){'}'}
        <span style={{ color: SC.tag }}>&gt;</span>{'\n'}
        {'      '}Count: {'{'}count{'}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;/button&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
  TypeScript: {
    file: 'types.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>interface</span>{' '}
        <span style={{ color: SC.type }}>User</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>id</span>:{' '}
        <span style={{ color: SC.type }}>number</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>name</span>:{' '}
        <span style={{ color: SC.type }}>string</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>role</span>:{' '}
        <span style={{ color: SC.string }}>"admin"</span> |{' '}
        <span style={{ color: SC.string }}>"user"</span>;{'\n'}
        {'}'}
        {'\n\n'}
        <span style={{ color: SC.keyword }}>function</span>{' '}
        <span style={{ color: SC.name }}>greet</span>&lt;
        <span style={{ color: SC.type }}>T</span> <span style={{ color: SC.keyword }}>extends</span>{' '}
        <span style={{ color: SC.type }}>User</span>&gt;(u:{' '}
        <span style={{ color: SC.type }}>T</span>){'\n'}
        : <span style={{ color: SC.type }}>string</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> `Hello, ${'{'}u.name{'}'}`;{'\n'}
        {'}'}
      </>
    ),
  },
  'Next.js': {
    file: 'page.tsx',
    code: (
      <>
        <span style={{ color: SC.comment }}>// app/page.tsx</span>{'\n'}
        <span style={{ color: SC.keyword }}>export default async function</span>{' '}
        <span style={{ color: SC.name }}>Page</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>res</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>fetch</span>({'\n'}
        {'    '}<span style={{ color: SC.string }}>"https://api.example.com/posts"</span>,{'\n'}
        {'    '}{'{ '}<span style={{ color: SC.prop }}>next</span>: {'{ '}
        <span style={{ color: SC.prop }}>revalidate</span>:{' '}
        <span style={{ color: SC.string }}>60</span> {'} }'}
        {'\n'}
        {'  '});{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>posts</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>json</span>();{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.tag }}>&lt;PostList</span>{' '}
        <span style={{ color: SC.prop }}>data</span>={'{'}posts{'}'}{' '}
        <span style={{ color: SC.tag }}>/&gt;</span>;{'\n'}
        {'}'}
      </>
    ),
  },
  Vite: {
    file: 'vite.config.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>defineConfig</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"vite"</span>;{'\n'}
        <span style={{ color: SC.keyword }}>import</span>{' '}
        <span style={{ color: SC.name }}>react</span>{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"@vitejs/plugin-react"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export default</span>{' '}
        <span style={{ color: SC.name }}>defineConfig</span>({'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>plugins</span>: [
        <span style={{ color: SC.name }}>react</span>()],{'\n'}
        {'  '}<span style={{ color: SC.prop }}>server</span>: {'{ '}
        <span style={{ color: SC.prop }}>port</span>:{' '}
        <span style={{ color: SC.string }}>999</span>,{' '}
        <span style={{ color: SC.prop }}>open</span>:{' '}
        <span style={{ color: SC.string }}>true</span> {'}'},{'\n'}
        {'  '}<span style={{ color: SC.prop }}>resolve</span>: {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.prop }}>alias</span>: {'{ '}
        <span style={{ color: SC.string }}>"@"</span>:{' '}
        <span style={{ color: SC.string }}>"/src"</span> {'}'}
        {'\n'}
        {'  '}{'}'}
        {'\n'}
        {'}'});
      </>
    ),
  },
  'Tailwind CSS': {
    file: 'Button.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>Button</span>({'{ '}
        <span style={{ color: SC.prop }}>children</span> {'}'}) {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;button</span>{'\n'}
        {'      '}<span style={{ color: SC.prop }}>className</span>=
        <span style={{ color: SC.string }}>"px-4 py-2 rounded-lg</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>bg-indigo-500 hover:bg-indigo-600</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>text-white font-semibold</span>{'\n'}
        {'        '}<span style={{ color: SC.string }}>transition-colors shadow-lg"</span>{'\n'}
        {'    '}<span style={{ color: SC.tag }}>&gt;</span>{'\n'}
        {'      '}{'{'}children{'}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;/button&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
  Zustand: {
    file: 'useStore.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>create</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"zustand"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>interface</span>{' '}
        <span style={{ color: SC.type }}>BearState</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>bears</span>:{' '}
        <span style={{ color: SC.type }}>number</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>increase</span>:{' '}
        () =&gt; <span style={{ color: SC.type }}>void</span>;{'\n'}
        {'}'}
        {'\n\n'}
        <span style={{ color: SC.keyword }}>export const</span>{' '}
        <span style={{ color: SC.name }}>useBearStore</span> ={' '}
        <span style={{ color: SC.name }}>create</span>&lt;
        <span style={{ color: SC.type }}>BearState</span>&gt;(({' '}
        <span style={{ color: SC.prop }}>set</span> ) =&gt; ({'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>bears</span>:{' '}
        <span style={{ color: SC.string }}>0</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>increase</span>: () =&gt;{'\n'}
        {'    '}<span style={{ color: SC.name }}>set</span>(s =&gt; ({'{ '}
        <span style={{ color: SC.prop }}>bears</span>: s.bears + 1 {'}'})),{'\n'}
        {'}'}));
      </>
    ),
  },
  'React Query': {
    file: 'useUsers.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>useQuery</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"@tanstack/react-query"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>useUsers</span>() {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.name }}>useQuery</span>({'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.prop }}>queryKey</span>: [
        <span style={{ color: SC.string }}>"users"</span>],{'\n'}
        {'    '}<span style={{ color: SC.prop }}>queryFn</span>:{' '}
        <span style={{ color: SC.keyword }}>async</span> () =&gt; {'{'}
        {'\n'}
        {'      '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>res</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>fetch</span>(
        <span style={{ color: SC.string }}>"/api/users"</span>);{'\n'}
        {'      '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>json</span>();{'\n'}
        {'    '}{'}'},{'\n'}
        {'    '}<span style={{ color: SC.prop }}>staleTime</span>:{' '}
        <span style={{ color: SC.string }}>60_000</span>,{'\n'}
        {'  '}{'}'});{'\n'}
        {'}'}
      </>
    ),
  },
  'Framer Motion': {
    file: 'FadeIn.tsx',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        {'{ '}<span style={{ color: SC.name }}>motion</span>{' }'}{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"framer-motion"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>export function</span>{' '}
        <span style={{ color: SC.name }}>FadeIn</span>({'{ '}
        <span style={{ color: SC.prop }}>children</span> {'}'}) {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> ({'\n'}
        {'    '}<span style={{ color: SC.tag }}>&lt;motion.div</span>{'\n'}
        {'      '}<span style={{ color: SC.prop }}>initial</span>={'{{ '}
        <span style={{ color: SC.prop }}>opacity</span>:{' '}
        <span style={{ color: SC.string }}>0</span>,{' '}
        <span style={{ color: SC.prop }}>y</span>:{' '}
        <span style={{ color: SC.string }}>20</span> {'}}'}
        {'\n'}
        {'      '}<span style={{ color: SC.prop }}>animate</span>={'{{ '}
        <span style={{ color: SC.prop }}>opacity</span>:{' '}
        <span style={{ color: SC.string }}>1</span>,{' '}
        <span style={{ color: SC.prop }}>y</span>:{' '}
        <span style={{ color: SC.string }}>0</span> {'}}'}
        {'\n'}
        {'      '}<span style={{ color: SC.prop }}>transition</span>={'{{ '}
        <span style={{ color: SC.prop }}>duration</span>:{' '}
        <span style={{ color: SC.string }}>0.5</span> {'}}'}
        {'\n'}
        {'    '}<span style={{ color: SC.tag }}>&gt;</span>
        {'{'}children{'}'}
        <span style={{ color: SC.tag }}>&lt;/motion.div&gt;</span>{'\n'}
        {'  '});{'\n'}
        {'}'}
      </>
    ),
  },
  'Node.js': {
    file: 'server.ts',
    code: (
      <>
        <span style={{ color: SC.keyword }}>import</span>{' '}
        <span style={{ color: SC.name }}>express</span>{' '}
        <span style={{ color: SC.keyword }}>from</span>{' '}
        <span style={{ color: SC.string }}>"express"</span>;{'\n\n'}
        <span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>app</span> ={' '}
        <span style={{ color: SC.name }}>express</span>();{'\n'}
        <span style={{ color: SC.prop }}>app</span>.
        <span style={{ color: SC.name }}>use</span>(
        <span style={{ color: SC.name }}>express</span>.
        <span style={{ color: SC.name }}>json</span>());{'\n\n'}
        <span style={{ color: SC.prop }}>app</span>.
        <span style={{ color: SC.name }}>get</span>(
        <span style={{ color: SC.string }}>"/api/users/:id"</span>,{' '}
        <span style={{ color: SC.keyword }}>async</span> (req, res) =&gt; {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>try</span> {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>user</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>db</span>.
        <span style={{ color: SC.name }}>user</span>.
        <span style={{ color: SC.name }}>findUnique</span>({'\n'}
        {'      '}{'{ '}<span style={{ color: SC.prop }}>where</span>: {'{ '}
        <span style={{ color: SC.prop }}>id</span>: +req.params.id {'} }'}
        {'\n'}
        {'    '});{'\n'}
        {'    '}<span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>json</span>(
        <span style={{ color: SC.prop }}>user</span>);{'\n'}
        {'  '}{'}'} <span style={{ color: SC.keyword }}>catch</span> (err) {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.prop }}>res</span>.
        <span style={{ color: SC.name }}>status</span>(
        <span style={{ color: SC.string }}>500</span>).
        <span style={{ color: SC.name }}>json</span>({'{ '}
        <span style={{ color: SC.prop }}>error</span>:{' '}
        <span style={{ color: SC.string }}>"Server error"</span> {'}'});{'\n'}
        {'  '}{'}'}
        {'\n'}
        {'}'});{'\n\n'}
        <span style={{ color: SC.prop }}>app</span>.
        <span style={{ color: SC.name }}>listen</span>(
        <span style={{ color: SC.string }}>3000</span>);
      </>
    ),
  },
  'Java / Spring': {
    file: 'UserController.java',
    code: (
      <>
        <span style={{ color: SC.comment }}>// src/main/java/.../UserController.java</span>{'\n'}
        <span style={{ color: SC.tag }}>@RestController</span>{'\n'}
        <span style={{ color: SC.tag }}>@RequestMapping</span>(
        <span style={{ color: SC.string }}>"/api/users"</span>){'\n'}
        <span style={{ color: SC.keyword }}>public class</span>{' '}
        <span style={{ color: SC.type }}>UserController</span> {'{'}
        {'\n\n'}
        {'  '}<span style={{ color: SC.keyword }}>private final</span>{' '}
        <span style={{ color: SC.type }}>UserService</span>{' '}
        <span style={{ color: SC.prop }}>userService</span>;{'\n\n'}
        {'  '}<span style={{ color: SC.keyword }}>public</span>{' '}
        <span style={{ color: SC.name }}>UserController</span>(
        <span style={{ color: SC.type }}>UserService</span>{' '}
        <span style={{ color: SC.prop }}>userService</span>) {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.keyword }}>this</span>.
        <span style={{ color: SC.prop }}>userService</span> ={' '}
        <span style={{ color: SC.prop }}>userService</span>;{'\n'}
        {'  '}{'}'}
        {'\n\n'}
        {'  '}<span style={{ color: SC.tag }}>@GetMapping</span>(
        <span style={{ color: SC.string }}>"/{'{'}id{'}'}"</span>){'\n'}
        {'  '}<span style={{ color: SC.keyword }}>public</span>{' '}
        <span style={{ color: SC.type }}>ResponseEntity</span>&lt;
        <span style={{ color: SC.type }}>User</span>&gt;{' '}
        <span style={{ color: SC.name }}>getUser</span>({'\n'}
        {'    '}<span style={{ color: SC.tag }}>@PathVariable</span>{' '}
        <span style={{ color: SC.type }}>Long</span>{' '}
        <span style={{ color: SC.prop }}>id</span>{'\n'}
        {'  '}) {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.type }}>ResponseEntity</span>.
        <span style={{ color: SC.name }}>ok</span>(
        <span style={{ color: SC.prop }}>userService</span>.
        <span style={{ color: SC.name }}>findById</span>(
        <span style={{ color: SC.prop }}>id</span>));{'\n'}
        {'  '}{'}'}
        {'\n'}
        {'}'}
      </>
    ),
  },
  JavaScript: {
    file: 'utils.js',
    code: (
      <>
        <span style={{ color: SC.comment }}>// 디바운스 유틸 + async/await 예제</span>{'\n'}
        <span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.name }}>debounce</span> = (fn, delay) =&gt; {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>let</span>{' '}
        <span style={{ color: SC.prop }}>timer</span>;{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span> (...args) =&gt; {'{'}
        {'\n'}
        {'    '}<span style={{ color: SC.name }}>clearTimeout</span>(
        <span style={{ color: SC.prop }}>timer</span>);{'\n'}
        {'    '}<span style={{ color: SC.prop }}>timer</span> ={' '}
        <span style={{ color: SC.name }}>setTimeout</span>(() =&gt;{' '}
        <span style={{ color: SC.name }}>fn</span>(...args), delay);{'\n'}
        {'  '}{'}'};{'\n'}
        {'}'};{'\n\n'}
        <span style={{ color: SC.keyword }}>async function</span>{' '}
        <span style={{ color: SC.name }}>fetchUser</span>(id) {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>const</span>{' '}
        <span style={{ color: SC.prop }}>res</span> ={' '}
        <span style={{ color: SC.keyword }}>await</span>{' '}
        <span style={{ color: SC.name }}>fetch</span>(`/api/users/${'${'}id{'}'}`);{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>if</span> (!<span style={{ color: SC.prop }}>res</span>.<span style={{ color: SC.name }}>ok</span>){' '}
        <span style={{ color: SC.keyword }}>throw new</span>{' '}
        <span style={{ color: SC.type }}>Error</span>(<span style={{ color: SC.string }}>"Fetch failed"</span>);{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>return</span>{' '}
        <span style={{ color: SC.prop }}>res</span>.<span style={{ color: SC.name }}>json</span>();{'\n'}
        {'}'}
      </>
    ),
  },
  'HTML/CSS': {
    file: 'card.html',
    code: (
      <>
        <span style={{ color: SC.tag }}>&lt;article</span>{' '}
        <span style={{ color: SC.prop }}>class</span>=<span style={{ color: SC.string }}>"card"</span>
        <span style={{ color: SC.tag }}>&gt;</span>{'\n'}
        {'  '}<span style={{ color: SC.tag }}>&lt;img</span>{' '}
        <span style={{ color: SC.prop }}>src</span>=<span style={{ color: SC.string }}>"/hero.jpg"</span>{' '}
        <span style={{ color: SC.prop }}>alt</span>=<span style={{ color: SC.string }}>""</span>
        <span style={{ color: SC.tag }}>/&gt;</span>{'\n'}
        {'  '}<span style={{ color: SC.tag }}>&lt;h2&gt;</span>Portfolio
        <span style={{ color: SC.tag }}>&lt;/h2&gt;</span>{'\n'}
        {'  '}<span style={{ color: SC.tag }}>&lt;p&gt;</span>Frontend Developer
        <span style={{ color: SC.tag }}>&lt;/p&gt;</span>{'\n'}
        <span style={{ color: SC.tag }}>&lt;/article&gt;</span>{'\n\n'}
        <span style={{ color: SC.comment }}>/* styles.css */</span>{'\n'}
        <span style={{ color: SC.name }}>.card</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>display</span>:{' '}
        <span style={{ color: SC.string }}>grid</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>gap</span>:{' '}
        <span style={{ color: SC.string }}>1rem</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>padding</span>:{' '}
        <span style={{ color: SC.string }}>1.5rem</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>border-radius</span>:{' '}
        <span style={{ color: SC.string }}>12px</span>;{'\n'}
        {'  '}<span style={{ color: SC.prop }}>background</span>:{' '}
        <span style={{ color: SC.keyword }}>linear-gradient</span>(
        <span style={{ color: SC.string }}>135deg</span>, #6366f1, #a855f7);{'\n'}
        {'  '}<span style={{ color: SC.prop }}>transition</span>:{' '}
        <span style={{ color: SC.string }}>transform</span>{' '}
        <span style={{ color: SC.string }}>0.25s</span>;{'\n'}
        {'}'}
        {'\n'}
        <span style={{ color: SC.name }}>.card</span>:<span style={{ color: SC.name }}>hover</span> {'{'}
        {'\n'}
        {'  '}<span style={{ color: SC.prop }}>transform</span>:{' '}
        <span style={{ color: SC.keyword }}>translateY</span>(<span style={{ color: SC.string }}>-4px</span>);{'\n'}
        {'}'}
      </>
    ),
  },
  MySQL: {
    file: 'schema.sql',
    code: (
      <>
        <span style={{ color: SC.comment }}>-- 사용자 테이블 생성 + 인덱스</span>{'\n'}
        <span style={{ color: SC.keyword }}>CREATE TABLE</span>{' '}
        <span style={{ color: SC.name }}>users</span> ({'\n'}
        {'  '}<span style={{ color: SC.prop }}>id</span>{' '}
        <span style={{ color: SC.type }}>BIGINT</span>{' '}
        <span style={{ color: SC.keyword }}>UNSIGNED AUTO_INCREMENT PRIMARY KEY</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>email</span>{' '}
        <span style={{ color: SC.type }}>VARCHAR</span>(<span style={{ color: SC.string }}>255</span>){' '}
        <span style={{ color: SC.keyword }}>NOT NULL UNIQUE</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>name</span>{' '}
        <span style={{ color: SC.type }}>VARCHAR</span>(<span style={{ color: SC.string }}>100</span>){' '}
        <span style={{ color: SC.keyword }}>NOT NULL</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>role</span>{' '}
        <span style={{ color: SC.type }}>ENUM</span>(<span style={{ color: SC.string }}>'admin'</span>,{' '}
        <span style={{ color: SC.string }}>'user'</span>){' '}
        <span style={{ color: SC.keyword }}>DEFAULT</span>{' '}
        <span style={{ color: SC.string }}>'user'</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>created_at</span>{' '}
        <span style={{ color: SC.type }}>TIMESTAMP</span>{' '}
        <span style={{ color: SC.keyword }}>DEFAULT CURRENT_TIMESTAMP</span>
        {'\n'}
        ) <span style={{ color: SC.keyword }}>ENGINE</span>=InnoDB{' '}
        <span style={{ color: SC.keyword }}>CHARSET</span>=utf8mb4;{'\n\n'}
        <span style={{ color: SC.keyword }}>CREATE INDEX</span>{' '}
        <span style={{ color: SC.name }}>idx_users_role</span>{' '}
        <span style={{ color: SC.keyword }}>ON</span>{' '}
        <span style={{ color: SC.name }}>users</span>(
        <span style={{ color: SC.prop }}>role</span>,{' '}
        <span style={{ color: SC.prop }}>created_at</span>);
      </>
    ),
  },
  Oracle: {
    file: 'procedure.sql',
    code: (
      <>
        <span style={{ color: SC.comment }}>-- PL/SQL 프로시저: 월별 매출 집계</span>{'\n'}
        <span style={{ color: SC.keyword }}>CREATE OR REPLACE PROCEDURE</span>{' '}
        <span style={{ color: SC.name }}>aggregate_monthly_sales</span>({'\n'}
        {'  '}<span style={{ color: SC.prop }}>p_year</span>{' '}
        <span style={{ color: SC.keyword }}>IN</span>{' '}
        <span style={{ color: SC.type }}>NUMBER</span>
        {'\n'}
        ) <span style={{ color: SC.keyword }}>IS</span>{'\n'}
        <span style={{ color: SC.keyword }}>BEGIN</span>
        {'\n'}
        {'  '}<span style={{ color: SC.keyword }}>MERGE INTO</span>{' '}
        <span style={{ color: SC.name }}>monthly_sales</span> m{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>USING</span> ({'\n'}
        {'    '}<span style={{ color: SC.keyword }}>SELECT</span>{' '}
        <span style={{ color: SC.name }}>TO_CHAR</span>(o.order_date,{' '}
        <span style={{ color: SC.string }}>'YYYY-MM'</span>){' '}
        <span style={{ color: SC.keyword }}>AS</span> ym,{'\n'}
        {'           '}<span style={{ color: SC.name }}>SUM</span>(o.amount){' '}
        <span style={{ color: SC.keyword }}>AS</span> total{'\n'}
        {'    '}<span style={{ color: SC.keyword }}>FROM</span>{' '}
        <span style={{ color: SC.name }}>orders</span> o{'\n'}
        {'    '}<span style={{ color: SC.keyword }}>WHERE</span>{' '}
        <span style={{ color: SC.name }}>EXTRACT</span>(<span style={{ color: SC.keyword }}>YEAR FROM</span> o.order_date) ={' '}
        <span style={{ color: SC.prop }}>p_year</span>{'\n'}
        {'    '}<span style={{ color: SC.keyword }}>GROUP BY</span>{' '}
        <span style={{ color: SC.name }}>TO_CHAR</span>(o.order_date,{' '}
        <span style={{ color: SC.string }}>'YYYY-MM'</span>){'\n'}
        {'  '}) <span style={{ color: SC.prop }}>src</span>{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>ON</span> (m.ym = src.ym){'\n'}
        {'  '}<span style={{ color: SC.keyword }}>WHEN MATCHED THEN UPDATE SET</span>{' '}
        m.total = src.total{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>WHEN NOT MATCHED THEN INSERT</span>{' '}
        (ym, total) <span style={{ color: SC.keyword }}>VALUES</span> (src.ym, src.total);{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>COMMIT</span>;{'\n'}
        <span style={{ color: SC.keyword }}>END</span>;
      </>
    ),
  },
  PostgreSQL: {
    file: 'window.sql',
    code: (
      <>
        <span style={{ color: SC.comment }}>-- 윈도우 함수로 카테고리별 매출 순위</span>{'\n'}
        <span style={{ color: SC.keyword }}>SELECT</span>{'\n'}
        {'  '}<span style={{ color: SC.prop }}>category</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>product_name</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>revenue</span>,{'\n'}
        {'  '}<span style={{ color: SC.name }}>RANK</span>() <span style={{ color: SC.keyword }}>OVER</span> ({'\n'}
        {'    '}<span style={{ color: SC.keyword }}>PARTITION BY</span>{' '}
        <span style={{ color: SC.prop }}>category</span>{'\n'}
        {'    '}<span style={{ color: SC.keyword }}>ORDER BY</span>{' '}
        <span style={{ color: SC.prop }}>revenue</span>{' '}
        <span style={{ color: SC.keyword }}>DESC</span>
        {'\n'}
        {'  '}) <span style={{ color: SC.keyword }}>AS</span>{' '}
        <span style={{ color: SC.name }}>rnk</span>,{'\n'}
        {'  '}<span style={{ color: SC.name }}>SUM</span>(<span style={{ color: SC.prop }}>revenue</span>){' '}
        <span style={{ color: SC.keyword }}>OVER</span> (
        <span style={{ color: SC.keyword }}>PARTITION BY</span>{' '}
        <span style={{ color: SC.prop }}>category</span>){' '}
        <span style={{ color: SC.keyword }}>AS</span>{' '}
        <span style={{ color: SC.name }}>cat_total</span>
        {'\n'}
        <span style={{ color: SC.keyword }}>FROM</span>{' '}
        <span style={{ color: SC.name }}>product_sales</span>
        {'\n'}
        <span style={{ color: SC.keyword }}>WHERE</span>{' '}
        <span style={{ color: SC.prop }}>sale_date</span> &gt;={' '}
        <span style={{ color: SC.name }}>NOW</span>() - <span style={{ color: SC.keyword }}>INTERVAL</span>{' '}
        <span style={{ color: SC.string }}>'30 days'</span>
        {'\n'}
        <span style={{ color: SC.keyword }}>ORDER BY</span>{' '}
        <span style={{ color: SC.prop }}>category</span>,{' '}
        <span style={{ color: SC.name }}>rnk</span>;
      </>
    ),
  },
  Git: {
    file: 'commands.sh',
    code: (
      <>
        <span style={{ color: SC.comment }}># feature 브랜치 워크플로우</span>{'\n'}
        <span style={{ color: SC.name }}>git</span> checkout -b feature/analytics-dashboard{'\n'}
        <span style={{ color: SC.name }}>git</span> add .{'\n'}
        <span style={{ color: SC.name }}>git</span> commit -m <span style={{ color: SC.string }}>"feat : Analytics 대시보드 추가"</span>
        {'\n'}
        <span style={{ color: SC.name }}>git</span> push origin feature/analytics-dashboard{'\n\n'}
        <span style={{ color: SC.comment }}># main 동기화 + rebase로 깔끔한 히스토리</span>{'\n'}
        <span style={{ color: SC.name }}>git</span> fetch origin{'\n'}
        <span style={{ color: SC.name }}>git</span> rebase origin/main{'\n\n'}
        <span style={{ color: SC.comment }}># 병합 후 로컬/원격 브랜치 정리</span>{'\n'}
        <span style={{ color: SC.name }}>git</span> branch -d feature/analytics-dashboard{'\n'}
        <span style={{ color: SC.name }}>git</span> push origin --delete feature/analytics-dashboard{'\n'}
        <span style={{ color: SC.name }}>git</span> fetch --prune{'\n\n'}
        <span style={{ color: SC.comment }}># 잘못된 커밋 되돌리기 (안전)</span>{'\n'}
        <span style={{ color: SC.name }}>git</span> revert &lt;commit-hash&gt;
      </>
    ),
  },
  SQL: {
    file: 'query.sql',
    code: (
      <>
        <span style={{ color: SC.comment }}>-- 월별 매출 상위 10개 상품 조회</span>{'\n'}
        <span style={{ color: SC.keyword }}>SELECT</span>{'\n'}
        {'  '}<span style={{ color: SC.prop }}>p</span>.<span style={{ color: SC.name }}>product_id</span>,{'\n'}
        {'  '}<span style={{ color: SC.prop }}>p</span>.<span style={{ color: SC.name }}>name</span>,{'\n'}
        {'  '}<span style={{ color: SC.name }}>COUNT</span>(<span style={{ color: SC.prop }}>o</span>.<span style={{ color: SC.name }}>order_id</span>){' '}
        <span style={{ color: SC.keyword }}>AS</span>{' '}
        <span style={{ color: SC.name }}>order_cnt</span>,{'\n'}
        {'  '}<span style={{ color: SC.name }}>SUM</span>(<span style={{ color: SC.prop }}>o</span>.<span style={{ color: SC.name }}>amount</span>){' '}
        <span style={{ color: SC.keyword }}>AS</span>{' '}
        <span style={{ color: SC.name }}>revenue</span>{'\n'}
        <span style={{ color: SC.keyword }}>FROM</span>{' '}
        <span style={{ color: SC.name }}>products</span>{' '}
        <span style={{ color: SC.prop }}>p</span>{'\n'}
        <span style={{ color: SC.keyword }}>INNER JOIN</span>{' '}
        <span style={{ color: SC.name }}>orders</span>{' '}
        <span style={{ color: SC.prop }}>o</span>{'\n'}
        {'  '}<span style={{ color: SC.keyword }}>ON</span>{' '}
        <span style={{ color: SC.prop }}>p</span>.<span style={{ color: SC.name }}>product_id</span> ={' '}
        <span style={{ color: SC.prop }}>o</span>.<span style={{ color: SC.name }}>product_id</span>
        {'\n'}
        <span style={{ color: SC.keyword }}>WHERE</span>{' '}
        <span style={{ color: SC.prop }}>o</span>.<span style={{ color: SC.name }}>created_at</span>{' '}
        &gt;= <span style={{ color: SC.string }}>'2025-01-01'</span>{'\n'}
        <span style={{ color: SC.keyword }}>GROUP BY</span>{' '}
        <span style={{ color: SC.prop }}>p</span>.<span style={{ color: SC.name }}>product_id</span>,{' '}
        <span style={{ color: SC.prop }}>p</span>.<span style={{ color: SC.name }}>name</span>
        {'\n'}
        <span style={{ color: SC.keyword }}>HAVING</span>{' '}
        <span style={{ color: SC.name }}>SUM</span>(<span style={{ color: SC.prop }}>o</span>.<span style={{ color: SC.name }}>amount</span>){' '}
        &gt; <span style={{ color: SC.string }}>100000</span>{'\n'}
        <span style={{ color: SC.keyword }}>ORDER BY</span>{' '}
        <span style={{ color: SC.name }}>revenue</span>{' '}
        <span style={{ color: SC.keyword }}>DESC</span>{'\n'}
        <span style={{ color: SC.keyword }}>LIMIT</span>{' '}
        <span style={{ color: SC.string }}>10</span>;
      </>
    ),
  },
}

const Skills = () => {
  const { t } = usePageTranslation(translations)
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.2 })
  const [selectedTech, setSelectedTech] = useState<string>('React')

  /**
   * 기술 스택 — "기술 스택" 카드(프로그레스 바)와 "주로 사용하는 기술" 뱃지의 공용 소스.
   * 각 항목은 코드 스니펫(codeSnippets)과 1:1 매칭되어야 합니다.
   */
  const skills: Skill[] = [
    // Frontend
    { name: 'React',         level: 90, category: 'frontend', icon: '⚛️' },
    { name: 'TypeScript',    level: 85, category: 'frontend', icon: '🔷' },
    { name: 'JavaScript',    level: 95, category: 'frontend', icon: '🟨' },
    { name: 'Next.js',       level: 80, category: 'frontend', icon: '▲'  },
    { name: 'HTML/CSS',      level: 95, category: 'frontend', icon: '🎨' },
    { name: 'Tailwind CSS',  level: 70, category: 'frontend', icon: '💨' },
    { name: 'Vite',          level: 80, category: 'frontend', icon: '⚡' },
    { name: 'Zustand',       level: 75, category: 'frontend', icon: '🐻' },
    { name: 'React Query',   level: 75, category: 'frontend', icon: '🔄' },
    { name: 'Framer Motion', level: 60, category: 'frontend', icon: '✨' },
    // Backend
    { name: 'Node.js',       level: 70, category: 'backend',  icon: '🟢' },
    { name: 'Java / Spring', level: 65, category: 'backend',  icon: '☕' },
    // Database
    { name: 'SQL',           level: 75, category: 'backend',  icon: '🗄️' },
    { name: 'MySQL',         level: 70, category: 'backend',  icon: '🐬' },
    { name: 'Oracle',        level: 65, category: 'backend',  icon: '🔶' },
    { name: 'PostgreSQL',    level: 60, category: 'backend',  icon: '🐘' },
    // Tools
    { name: 'Git',           level: 85, category: 'tools',    icon: '🔧' },
  ]

  // "주로 사용하는 기술" 뱃지 — skills 배열을 그대로 사용 (단일 소스)
  const techStack = skills

  return (
    <Box
      component="section"
      id="skills"
      ref={ref}
      sx={{ py: { xs: 10, md: 16 }, bgcolor: 'background.default' }}
    >
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 8,
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
          }}
        >
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: '0.2em' }}>
            {t('label')}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '1.875rem', md: '2.25rem', lg: '3rem' }, fontWeight: 700, mt: 1, mb: 2 }}
          >
            {t('title1')}{' '}
            <Box component="span" className="gradient-text">{t('title2')}</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 512, mx: 'auto' }}>
            {t('description')}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            transition: 'all 0.7s ease',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
            transitionDelay: '200ms',
          }}
        >
          {/* Skills Grid */}
          <Grid container spacing={2} sx={{ mb: 6 }}>
            {skills.map((skill, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={skill.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main', opacity: 0.85 },
                    transition: 'all 0.3s ease',
                    transitionDelay: `${index * 50}ms`,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight={500}>{skill.name}</Typography>
                    <Typography variant="body2" fontWeight={500} color="primary.main">{skill.level}%</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={isVisible ? skill.level : 0}
                    sx={{
                      bgcolor: 'background.default',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: 4,
                        transition: 'transform 1s ease-out',
                        transitionDelay: `${index * 100 + 300}ms`,
                      },
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Tech Stack */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h6" fontWeight={600} textAlign="center" mb={3}>
              {t('mainTech')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5 }}>
              {techStack.map((tech, index) => {
                const isActive = selectedTech === tech.name
                return (
                  <Chip
                    key={tech.name}
                    label={`${tech.icon} ${tech.name}`}
                    variant={isActive ? 'filled' : 'outlined'}
                    clickable
                    onClick={() => setSelectedTech(tech.name)}
                    sx={{
                      cursor: 'pointer',
                      borderColor: isActive ? 'primary.main' : 'divider',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 400,
                      transitionDelay: `${index * 50}ms`,
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                      bgcolor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'background.paper',
                    }}
                  />
                )
              })}
            </Box>
          </Box>

          {/* Code Block */}
          <Paper
            elevation={0}
            sx={{
              maxWidth: 512,
              mx: 'auto',
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            {/* Code Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.5,
                bgcolor: 'background.default',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f87171', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#facc15', opacity: 0.8 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4ade80', opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                {codeSnippets[selectedTech]?.file ?? 'developer.ts'}
              </Typography>
            </Box>
            {/* Code Content */}
            <Box
              component="pre"
              key={selectedTech}
              sx={{
                p: 2,
                fontSize: '0.875rem',
                fontFamily: "'Fira Code', monospace",
                overflowX: 'auto',
                m: 0,
                color: 'text.primary',
                minHeight: 280,
                animation: 'fadeIn 0.3s ease',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(4px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <code>{codeSnippets[selectedTech]?.code}</code>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  )
}

export default Skills
