import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { Project, Task } from '@/types/Types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setDefaultLocale } from "react-datepicker";
import ReactToPrint from 'react-to-print'
import { usePrint } from '@/component/Print.hook';
import zhCN from 'date-fns/locale/zh-CN';
import moment from 'moment'
import { createTasksAction } from '../service/TaskService'
import TablePrinter from '@/component/TablePrinter';
setDefaultLocale(zhCN)

const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const tasksRef = React.createRef()

  const [started, setStarted] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit1 = (data: Project) => {
    data.started_at = started
    data.mode = 1
    setTitle(data.name)
    console.log(data.name)
    const res = createTasksAction(data)
    setTasks(res)
  }

  const onSubmit2 = (data: Project) => {
    data.started_at = started
    data.mode = 2
    setTitle(data.name)
    console.log(data)
    const res = createTasksAction(data)
    setTasks(res)
  }

  const handleDateChange = (startDate: string) => {
    console.log(startDate)
    setStarted(startDate)
  };

  async function handlePrintAsync() {
    printTasks()
  }

  return (
    <>
      <Head>
        <title>艾宾浩斯记忆计划表</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="艾宾浩斯记忆计划表(inmory.com) - 利用艾宾浩斯记忆曲线有规律、有计划的背诵词汇，古诗等。"></meta>
      </Head>
      <header className='bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120'>
        <div className='hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]'>
          <span className="font-mono text-slate-500">By foyo labs</span>
        </div>
        <div className='relative z-10 mx-auto px-2 pb-2 pt-10 sm:px-6 md:max-w-2xl md:px-2 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 xl:px-12'>
          <div className='text-center lg:text-left'>
            <p className="text-xl font-bold text-slate-900"><a href="/">Inmory</a></p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">计划表生成工具</p>
          </div>
          <section className="mt-12 hidden lg:block">
            <form onSubmit={handleSubmit(onSubmit1)}>
              <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5"><path d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z" className="fill-violet-300"></path><path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z" className="fill-pink-300"></path></svg>
                <span className="ml-2.5">仅计划表</span>
              </h2>
              <div className="mt-2 text-base leading-7 text-slate-700 lg:line-clamp-4">

                <div className='col-span-6 sm:col-span-4 mt-4'>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 font-mono text-slate-500">计划名称</label>
                  <input {...register('name')} value="30天攻克300单词" type="text" name="name" id="name" className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                <div className='col-span-6 sm:col-span-4 mt-4'>
                  <label htmlFor="price" className="block text-sm font-medium mb-2 font-mono text-slate-500">持续周期(天)</label>
                  <input {...register('duration')} value="30" type="text" name="duration" id="duration" className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>

                <div className='col-span-6 sm:col-span-4 mt-4'>
                  <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">生成表格</button>
                </div>


              </div>
            </form>
          </section>

          <section className="mt-12 hidden lg:block">
            <form onSubmit={handleSubmit(onSubmit2)}>
              <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
                <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5"><path d="M0 5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5Z" className="fill-violet-300"></path><path d="M6 1a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V1Z" className="fill-pink-300"></path></svg>
                <span className="ml-2.5">有内容记忆表</span>
              </h2>
              <div className='col-span-6 sm:col-span-4 mt-4'>
                <label htmlFor="name" className="block text-sm font-medium mb-2 font-mono text-slate-500">计划名称</label>
                <input {...register('name')} value="30天攻克300单词" type="text" name="name" id="name" className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>
              <div className='col-span-6 sm:col-span-4 mt-4'>
                <label htmlFor="price" className="block text-sm font-medium mb-2 font-mono text-slate-500">开始日期</label>
                <DatePicker dateFormatCalendar='yyyy LLLL' dateFormat='yyyy/MM/dd' selected={started} onChange={handleDateChange} className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>

              <div className='col-span-6 sm:col-span-4 mt-4'>
                <label htmlFor="price" className="block text-sm font-medium mb-2 font-mono text-slate-500">日计划数</label>
                <select id="period_day_num" defaultValue={1} {...register('period_day_num')} name="period_day_num" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                  <option value={1}>1页</option>
                  <option value={2}>2页</option>
                </select>
              </div>

              <div className='col-span-6 sm:col-span-4 mt-4'>
                <label htmlFor="price" className="block text-sm font-medium mb-2 font-mono text-slate-500">内容前缀,如"P"表达页码</label>
                <input type="text" {...register('prefix')} value={'P'} placeholder='输入页码标识，如P' name="prefix" id="prefix" className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>

              <div className='col-span-6 sm:col-span-4 mt-4'>
                <label htmlFor="price" className="block text-sm font-medium mb-2 font-mono text-slate-500">总页数</label>
                <input type="text" value={'30'} {...register('total')} name="total" id="total" className="px-2 py-2 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
              </div>

              <div className='col-span-6 sm:col-span-4 mt-4'>
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">生成表格</button>
              </div>
            </form>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120">
        <svg aria-hidden="true" className="absolute left-0 top-0 h-20 w-full"><defs><linearGradient id=":Rkm:-fade" x1="0" x2="0" y1="0" y2="1"><stop offset="40%" stopColor="white"></stop><stop offset="100%" stopColor="black"></stop></linearGradient><linearGradient id=":Rkm:-gradient"><stop offset="0%" stopColor="#4989E8"></stop><stop offset="50%" stopColor="#6159DA"></stop><stop offset="100%" stopColor="#FF54AD"></stop></linearGradient><mask id=":Rkm:-mask"><rect width="100%" height="100%" fill="url(#:Rkm:-pattern)"></rect></mask><pattern id=":Rkm:-pattern" width="400" height="100%" patternUnits="userSpaceOnUse"><rect width="2" height="83%" x="2" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="99%" x="6" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="52%" x="10" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="99%" x="14" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="86%" x="18" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="91%" x="22" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="92%" x="26" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="75%" x="30" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="51%" x="34" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="88%" x="38" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="45%" x="42" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="56%" x="46" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="80%" x="50" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="44%" x="54" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="93%" x="58" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="98%" x="62" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="41%" x="66" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="47%" x="70" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="87%" x="74" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="67%" x="78" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="73%" x="82" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="69%" x="86" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="88%" x="90" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="53%" x="94" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="69%" x="98" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="75%" x="102" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="86%" x="106" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="43%" x="110" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="80%" x="114" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="81%" x="118" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="78%" x="122" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="56%" x="126" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="47%" x="130" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="90%" x="134" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="50%" x="138" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="52%" x="142" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="77%" x="146" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="81%" x="150" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="98%" x="154" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="48%" x="158" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="87%" x="162" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="87%" x="166" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="55%" x="170" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="41%" x="174" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="42%" x="178" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="93%" x="182" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="84%" x="186" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="67%" x="190" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="68%" x="194" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="55%" x="198" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="57%" x="202" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="56%" x="206" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="55%" x="210" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="46%" x="214" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="67%" x="218" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="69%" x="222" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="79%" x="226" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="84%" x="230" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="63%" x="234" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="94%" x="238" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="90%" x="242" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="51%" x="246" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="73%" x="250" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="55%" x="254" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="57%" x="258" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="69%" x="262" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="88%" x="266" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="84%" x="270" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="49%" x="274" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="95%" x="278" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="73%" x="282" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="54%" x="286" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="57%" x="290" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="72%" x="294" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="51%" x="298" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="44%" x="302" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="52%" x="306" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="87%" x="310" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="93%" x="314" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="46%" x="318" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="47%" x="322" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="57%" x="326" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="79%" x="330" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="95%" x="334" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="54%" x="338" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="65%" x="342" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="90%" x="346" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="99%" x="350" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="82%" x="354" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="98%" x="358" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="93%" x="362" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="60%" x="366" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="50%" x="370" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="69%" x="374" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="77%" x="378" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="93%" x="382" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="44%" x="386" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="51%" x="390" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="96%" x="394" fill="url(#:Rkm:-fade)"></rect><rect width="2" height="60%" x="398" fill="url(#:Rkm:-fade)"></rect></pattern></defs><rect width="100%" height="100%" fill="url(#:Rkm:-gradient)" mask="url(#:Rkm:-mask)" opacity="0.25"></rect></svg>
        <div className='relative'>
          <div className='pt-16 pb-12 px-4 sm:pb-4 lg:pt-12'>
            <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 ">
              <h1 className="text-2xl font-bold leading-7 text-slate-900">艾宾浩斯记忆表</h1>
              <table cellPadding='0' cellSpacing="0" className={styles.timetable} ref={tasksRef}>
                <caption><p className={styles.caption}>{title}</p></caption>
                <thead>
                  <tr>
                    <th rowSpan={2} width="5%">序号</th>
                    <th rowSpan={2} width="10%">日期</th>
                    <th rowSpan={2} width="25%">当天计划内容</th>
                    <th colSpan={8} width={"50%"}>长期复习内容</th>
                  </tr>
                  <tr>
                    <th>1天</th>
                    <th>2天</th>
                    <th>4天</th>
                    <th>7天</th>
                    <th>15天</th>
                    <th>30天</th>
                    <th>3个月</th>
                    <th>6个月</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task: Task) =>
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.created_at}</td>
                      <td style={{ 'textAlign': 'left', 'paddingLeft': '5px' }}>
                        {task.name}
                      </td>
                      <td>{task.reviews.get(1)}</td>
                      <td>{task.reviews.get(2)}</td>
                      <td>{task.reviews.get(4)}</td>
                      <td>{task.reviews.get(7)}</td>
                      <td>{task.reviews.get(15)}</td>
                      <td>{task.reviews.get(30)}</td>
                      <td>{task.reviews.get(90)}</td>
                      <td>{task.reviews.get(180)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ReactToPrint
                trigger={() => <button type="button" className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">打印计划表</button>}
                content={() => tasksRef.current}
              />
              {/* <button type="button" onClick={handlePrintAsync} className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">导出Excel</button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
